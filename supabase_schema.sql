-- 크레딧 시스템을 위한 Supabase 스키마

-- 1. 사용자 크레딧 테이블 (기존 auth.users 테이블과 연동)
CREATE TABLE IF NOT EXISTS public.user_credits (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    credits INTEGER NOT NULL DEFAULT 0,
    total_earned INTEGER NOT NULL DEFAULT 0,
    total_spent INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(user_id)
);

-- 2. 크레딧 거래 내역 테이블
CREATE TABLE IF NOT EXISTS public.credit_transactions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    amount INTEGER NOT NULL, -- 양수: 적립, 음수: 차감
    type TEXT NOT NULL CHECK (type IN ('signup_bonus', 'prd_generation', 'purchase', 'refund', 'admin')),
    description TEXT,
    metadata JSONB DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. PRD 생성 기록 테이블
CREATE TABLE IF NOT EXISTS public.prd_generations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    description TEXT,
    content JSONB,
    credits_used INTEGER NOT NULL DEFAULT 1,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. 새로운 사용자 가입 시 크레딧 자동 지급을 위한 함수
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    -- 새 사용자에게 10개 크레딧 지급
    INSERT INTO public.user_credits (user_id, credits, total_earned)
    VALUES (NEW.id, 10, 10);
    
    -- 가입 보너스 거래 기록
    INSERT INTO public.credit_transactions (user_id, amount, type, description)
    VALUES (NEW.id, 10, 'signup_bonus', 'Welcome bonus for new user');
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 5. 새 사용자 가입 트리거
CREATE OR REPLACE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- 6. 크레딧 업데이트 시 updated_at 자동 갱신
CREATE OR REPLACE FUNCTION public.update_user_credits_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE TRIGGER update_user_credits_updated_at
    BEFORE UPDATE ON public.user_credits
    FOR EACH ROW EXECUTE FUNCTION public.update_user_credits_updated_at();

-- 7. 인덱스 생성 (성능 최적화)
CREATE INDEX IF NOT EXISTS idx_user_credits_user_id ON public.user_credits(user_id);
CREATE INDEX IF NOT EXISTS idx_credit_transactions_user_id ON public.credit_transactions(user_id);
CREATE INDEX IF NOT EXISTS idx_credit_transactions_created_at ON public.credit_transactions(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_prd_generations_user_id ON public.prd_generations(user_id);
CREATE INDEX IF NOT EXISTS idx_prd_generations_created_at ON public.prd_generations(created_at DESC);

-- 8. RLS (Row Level Security) 정책 설정
ALTER TABLE public.user_credits ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.credit_transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.prd_generations ENABLE ROW LEVEL SECURITY;

-- 사용자는 자신의 크레딧 정보만 볼 수 있음
CREATE POLICY "Users can view own credits" ON public.user_credits
    FOR SELECT USING (auth.uid() = user_id);

-- 사용자는 자신의 거래 내역만 볼 수 있음
CREATE POLICY "Users can view own transactions" ON public.credit_transactions
    FOR SELECT USING (auth.uid() = user_id);

-- 사용자는 자신의 PRD 생성 기록만 볼 수 있음
CREATE POLICY "Users can view own PRD generations" ON public.prd_generations
    FOR SELECT USING (auth.uid() = user_id);

-- 사용자는 자신의 PRD 생성 기록만 생성/수정/삭제 가능
CREATE POLICY "Users can manage own PRD generations" ON public.prd_generations
    FOR ALL USING (auth.uid() = user_id);

-- 9. 크레딧 차감 함수 (PRD 생성 시 사용)
CREATE OR REPLACE FUNCTION public.deduct_credits(
    p_user_id UUID,
    p_amount INTEGER,
    p_description TEXT DEFAULT NULL
)
RETURNS BOOLEAN AS $$
DECLARE
    v_current_credits INTEGER;
BEGIN
    -- 현재 크레딧 확인
    SELECT credits INTO v_current_credits
    FROM public.user_credits
    WHERE user_id = p_user_id
    FOR UPDATE;
    
    IF v_current_credits IS NULL THEN
        RAISE EXCEPTION 'User credits not found';
    END IF;
    
    IF v_current_credits < p_amount THEN
        RAISE EXCEPTION 'Insufficient credits. Required: %, Available: %', p_amount, v_current_credits;
    END IF;
    
    -- 크레딧 차감
    UPDATE public.user_credits
    SET 
        credits = credits - p_amount,
        total_spent = total_spent + p_amount,
        updated_at = NOW()
    WHERE user_id = p_user_id;
    
    -- 거래 기록
    INSERT INTO public.credit_transactions (user_id, amount, type, description)
    VALUES (p_user_id, -p_amount, 'prd_generation', COALESCE(p_description, 'PRD Generation'));
    
    RETURN TRUE;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 10. 크레딧 추가 함수 (구매 시 사용)
CREATE OR REPLACE FUNCTION public.add_credits(
    p_user_id UUID,
    p_amount INTEGER,
    p_description TEXT DEFAULT NULL
)
RETURNS BOOLEAN AS $$
BEGIN
    -- 크레딧 추가
    UPDATE public.user_credits
    SET 
        credits = credits + p_amount,
        total_earned = total_earned + p_amount,
        updated_at = NOW()
    WHERE user_id = p_user_id;
    
    -- 거래 기록
    INSERT INTO public.credit_transactions (user_id, amount, type, description)
    VALUES (p_user_id, p_amount, 'purchase', COALESCE(p_description, 'Credit Purchase'));
    
    RETURN TRUE;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 11. 사용자 크레딧 조회 뷰 (현재 크레딧 + 요약)
CREATE OR REPLACE VIEW public.user_credits_summary AS
SELECT 
    uc.user_id,
    uc.credits as current_credits,
    uc.total_earned,
    uc.total_spent,
    uc.created_at,
    uc.updated_at,
    u.email as user_email
FROM public.user_credits uc
JOIN auth.users u ON uc.user_id = u.id;

-- 12. 최근 거래 내역 뷰
CREATE OR REPLACE VIEW public.recent_transactions AS
SELECT 
    ct.id,
    ct.user_id,
    ct.amount,
    ct.type,
    ct.description,
    ct.metadata,
    ct.created_at,
    CASE 
        WHEN ct.amount > 0 THEN 'credit'
        ELSE 'debit'
    END as transaction_type
FROM public.credit_transactions ct
ORDER BY ct.created_at DESC
LIMIT 50;
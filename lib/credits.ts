import { createClient } from '@/lib/supabase/client';
import { UserCredits, CreditTransaction, PrdGeneration, InsufficientCreditsError, UserCreditsNotFoundError, UserCreditsSummary } from '@/types/credits';

// 사용자 크레딧 정보 조회
export async function getUserCredits(userId: string): Promise<UserCredits | null> {
  const supabase = createClient();
  
  const { data, error } = await supabase
    .from('user_credits')
    .select('*')
    .eq('user_id', userId)
    .single();
    
  if (error) {
    console.error('Error fetching user credits:', error);
    return null;
  }
  
  return data;
}

// 사용자 크레딧 요약 조회
export async function getUserCreditsSummary(userId: string): Promise<UserCreditsSummary | null> {
  const supabase = createClient();
  
  const { data, error } = await supabase
    .from('user_credits_summary')
    .select('*')
    .eq('user_id', userId)
    .single();
    
  if (error) {
    console.error('Error fetching user credits summary:', error);
    return null;
  }
  
  return data as UserCreditsSummary | null;
}

// 크레딧 차감 (PRD 생성 시)
export async function deductCredits(
  userId: string, 
  amount: number = 1, 
  description?: string
): Promise<boolean> {
  const supabase = createClient();
  
  try {
    const { data, error } = await supabase
      .rpc('deduct_credits', {
        p_user_id: userId,
        p_amount: amount,
        p_description: description || 'PRD Generation'
      });
      
    if (error) {
      if (error.message.includes('Insufficient credits')) {
        throw new InsufficientCreditsError(amount, 0); // available credits will be fetched in UI
      }
      if (error.message.includes('User credits not found')) {
        throw new UserCreditsNotFoundError();
      }
      throw error;
    }
    
    return data;
  } catch (error) {
    console.error('Error deducting credits:', error);
    throw error;
  }
}

// 크레딧 추가 (구매 시)
export async function addCredits(
  userId: string, 
  amount: number, 
  description?: string
): Promise<boolean> {
  const supabase = createClient();
  
  try {
    const { data, error } = await supabase
      .rpc('add_credits', {
        p_user_id: userId,
        p_amount: amount,
        p_description: description || 'Credit Purchase'
      });
      
    if (error) throw error;
    
    return data;
  } catch (error) {
    console.error('Error adding credits:', error);
    throw error;
  }
}

// 최근 거래 내역 조회
export async function getRecentTransactions(userId: string, limit: number = 10): Promise<CreditTransaction[]> {
  const supabase = createClient();
  
  const { data, error } = await supabase
    .from('credit_transactions')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })
    .limit(limit);
    
  if (error) {
    console.error('Error fetching recent transactions:', error);
    return [];
  }
  
  return data || [];
}

// PRD 생성 기록 저장
export async function savePrdGeneration(
  userId: string,
  title: string,
  description: string | null,
  content: Record<string, any>,
  creditsUsed: number = 1
): Promise<PrdGeneration | null> {
  const supabase = createClient();
  
  const { data, error } = await supabase
    .from('prd_generations')
    .insert({
      user_id: userId,
      title,
      description,
      content,
      credits_used: creditsUsed
    })
    .select()
    .single();
    
  if (error) {
    console.error('Error saving PRD generation:', error);
    return null;
  }
  
  return data;
}

// 사용자의 PRD 생성 기록 조회
export async function getUserPrdGenerations(userId: string, limit: number = 10): Promise<PrdGeneration[]> {
  const supabase = createClient();
  
  const { data, error } = await supabase
    .from('prd_generations')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })
    .limit(limit);
    
  if (error) {
    console.error('Error fetching PRD generations:', error);
    return [];
  }
  
  return data || [];
}

// 크레딧 충전 옵션
export const CREDIT_PACKAGES = [
  { credits: 10, price: 9.99, label: '10 Credits' },
  { credits: 25, price: 19.99, label: '25 Credits (Save 20%)' },
  { credits: 50, price: 34.99, label: '50 Credits (Save 30%)' },
  { credits: 100, price: 59.99, label: '100 Credits (Save 40%)' },
];

// 크레딧 패키지 구매
export async function purchaseCreditPackage(userId: string, packageIndex: number): Promise<boolean> {
  const pkg = CREDIT_PACKAGES[packageIndex];
  if (!pkg) {
    throw new Error('Invalid package index');
  }
  
  try {
    // 실제 결제 로직은 여기에 구현 (Stripe, PayPal 등)
    // 지금은 시뮬레이션으로 바로 크레딧 추가
    await addCredits(userId, pkg.credits, `Purchased ${pkg.label}`);
    return true;
  } catch (error) {
    console.error('Error purchasing credit package:', error);
    throw error;
  }
}
// 크레딧 시스템 타입 정의

export interface UserCredits {
  id: string;
  user_id: string;
  credits: number;
  total_earned: number;
  total_spent: number;
  created_at: string;
  updated_at: string;
}

export interface CreditTransaction {
  id: string;
  user_id: string;
  amount: number; // 양수: 적립, 음수: 차감
  type: 'signup_bonus' | 'prd_generation' | 'purchase' | 'refund' | 'admin';
  description: string | null;
  metadata: Record<string, any>;
  created_at: string;
}

export interface PrdGeneration {
  id: string;
  user_id: string;
  title: string;
  description: string | null;
  content: Record<string, any> | null;
  credits_used: number;
  created_at: string;
  updated_at: string;
}

export interface UserCreditsSummary {
  user_id: string;
  current_credits: number;
  total_earned: number;
  total_spent: number;
  created_at: string;
  updated_at: string;
  user_email: string;
}

export interface RecentTransaction {
  id: string;
  user_id: string;
  amount: number;
  type: string;
  description: string | null;
  metadata: Record<string, any>;
  created_at: string;
  transaction_type: 'credit' | 'debit';
}

// 크레딧 관련 에러 타입
export class InsufficientCreditsError extends Error {
  constructor(public required: number, public available: number) {
    super(`Insufficient credits. Required: ${required}, Available: ${available}`);
    this.name = 'InsufficientCreditsError';
  }
}

export class UserCreditsNotFoundError extends Error {
  constructor() {
    super('User credits not found');
    this.name = 'UserCreditsNotFoundError';
  }
}
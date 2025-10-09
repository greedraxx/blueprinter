'use client';

import { useState, useEffect } from 'react';
import { getUserCreditsSummary } from '@/lib/credits';
import { UserCreditsSummary } from '@/types/credits';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Coins, TrendingUp, TrendingDown } from 'lucide-react';
import { useAuth } from '@/lib/auth-context';

interface CreditDisplayProps {
  onPurchaseClick?: () => void;
}

export function CreditDisplay({ onPurchaseClick }: CreditDisplayProps) {
  const { user } = useAuth();
  const [credits, setCredits] = useState<UserCreditsSummary | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.id) {
      loadCredits();
    }
  }, [user?.id]);

  const loadCredits = async () => {
    try {
      setLoading(true);
      const data = await getUserCreditsSummary(user!.id);
      setCredits(data);
    } catch (error) {
      console.error('Error loading credits:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Card className="w-full">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="animate-pulse h-4 w-4 bg-gray-300 rounded-full"></div>
              <div className="animate-pulse h-4 w-20 bg-gray-300 rounded"></div>
            </div>
            <div className="animate-pulse h-8 w-24 bg-gray-300 rounded"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!credits) {
    return null;
  }

  const isLowCredits = credits.current_credits <= 3;
  const isNoCredits = credits.current_credits === 0;

  return (
    <Card className={`w-full ${isLowCredits ? 'border-orange-200 bg-orange-50' : ''} ${isNoCredits ? 'border-red-200 bg-red-50' : ''}`}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg flex items-center space-x-2">
            <Coins className="h-5 w-5 text-yellow-500" />
            <span>My Credits</span>
          </CardTitle>
          {isLowCredits && (
            <span className="text-xs bg-orange-100 text-orange-800 px-2 py-1 rounded-full">
              {isNoCredits ? 'No Credits' : 'Low Credits'}
            </span>
          )}
        </div>
        <CardDescription>
          {isNoCredits ? 'Purchase credits to generate PRDs' : 'Use credits to generate PRDs'}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="text-3xl font-bold text-gray-900">
            {credits.current_credits}
          </div>
          <Button
            onClick={onPurchaseClick}
            size="lg"
            className={
              isNoCredits
                ? "bg-green-600 hover:bg-green-700 text-white rounded-full h-12 px-6 font-bold"
                : "bg-black hover:bg-black/90 text-white rounded-full h-12 px-6 font-bold"
            }
          >
            BUY CREDIT
          </Button>
        </div>

        <div className="grid grid-cols-2 gap-4 pt-4 border-t">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-1 text-green-600">
              <TrendingUp className="h-4 w-4" />
              <span className="text-sm font-medium">Earned</span>
            </div>
            <div className="text-lg font-semibold">{credits.total_earned}</div>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center space-x-1 text-red-600">
              <TrendingDown className="h-4 w-4" />
              <span className="text-sm font-medium">Spent</span>
            </div>
            <div className="text-lg font-semibold">{credits.total_spent}</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
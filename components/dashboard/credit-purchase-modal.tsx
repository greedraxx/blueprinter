'use client';

import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Coins, Check, Loader2 } from 'lucide-react';
import { purchaseCreditPackage, addCredits } from '@/lib/credits';
import { useAuth } from '@/lib/auth-context';
import { toast } from '@/components/ui/use-toast';
import { CREDIT_PACKAGES } from '@/lib/credits';

interface CreditPurchaseModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onPurchaseComplete?: () => void;
}

export function CreditPurchaseModal({ open, onOpenChange, onPurchaseComplete }: CreditPurchaseModalProps) {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState<number | null>(null);

  const handlePurchase = async (packageIndex: number) => {
    if (!user?.id) {
      toast({
        title: "Error",
        description: "You must be logged in to purchase credits",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    setSelectedPackage(packageIndex);

    try {
      // 실제 결제는 Stripe 등으로 구현 필요
      // 지금은 시뮬레이션으로 바로 크레딧 추가
      const pkg = CREDIT_PACKAGES[packageIndex];
      await addCredits(user.id, pkg.credits, `Purchased ${pkg.label}`);

      toast({
        title: "Success!",
        description: `Successfully purchased ${pkg.credits} credits!`,
      });

      onPurchaseComplete?.();
      onOpenChange(false);
      setSelectedPackage(null);
    } catch (error) {
      console.error('Purchase error:', error);
      toast({
        title: "Error",
        description: "Failed to purchase credits. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const benefits = [
    "Generate professional PRD documents",
    "AI-powered content creation",
    "Unlimited revisions",
    "Priority support"
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Coins className="h-6 w-6 text-yellow-500" />
            <span>Purchase Credits</span>
          </DialogTitle>
          <DialogDescription>
            Choose a credit package to start generating professional PRDs
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* 크레딧 패키지 선택 */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Select Package</h3>
            <div className="grid gap-3">
              {CREDIT_PACKAGES.map((pkg, index) => (
                <Card
                  key={index}
                  className={`cursor-pointer transition-all hover:shadow-md ${
                    selectedPackage === index ? 'ring-2 ring-blue-500 shadow-md' : ''
                  }`}
                  onClick={() => setSelectedPackage(index)}
                >
                  <CardHeader className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="p-2 bg-yellow-100 rounded-full">
                          <Coins className="h-5 w-5 text-yellow-600" />
                        </div>
                        <div>
                          <h4 className="font-semibold">{pkg.label}</h4>
                          <p className="text-sm text-gray-500">
                            {pkg.credits} credits
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-xl font-bold text-green-600">
                          ${pkg.price}
                        </div>
                        {pkg.credits > 10 && (
                          <div className="text-xs text-green-600 font-medium">
                            Save {Math.round((1 - pkg.price / (pkg.credits * 0.99)) * 100)}%
                          </div>
                        )}
                      </div>
                    </div>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </div>

          {/* 혜택 및 구매 버튼 */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">What's Included</h3>
            <div className="space-y-3">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <div className="p-1 bg-green-100 rounded-full">
                    <Check className="h-4 w-4 text-green-600" />
                  </div>
                  <span className="text-gray-700">{benefit}</span>
                </div>
              ))}
            </div>

            {selectedPackage !== null && (
              <div className="pt-4 border-t">
                <div className="bg-gray-50 p-4 rounded-lg mb-4">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Selected Package:</span>
                    <span className="font-bold">
                      {CREDIT_PACKAGES[selectedPackage].label}
                    </span>
                  </div>
                  <div className="flex justify-between items-center mt-2">
                    <span className="font-medium">Total Price:</span>
                    <span className="text-xl font-bold text-green-600">
                      ${CREDIT_PACKAGES[selectedPackage].price}
                    </span>
                  </div>
                </div>

                <Button
                  onClick={() => handlePurchase(selectedPackage)}
                  disabled={loading}
                  className="w-full bg-green-600 hover:bg-green-700"
                  size="lg"
                >
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <Coins className="mr-2 h-4 w-4" />
                      Purchase Credits
                    </>
                  )}
                </Button>

                <p className="text-xs text-gray-500 text-center mt-2">
                  * This is a demo. In production, integrate with Stripe or PayPal.
                </p>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
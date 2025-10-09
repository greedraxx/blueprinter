'use client';

import { useEffect, useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Coins, Check, Loader2 } from 'lucide-react';
import { CREDIT_PACKAGES } from '@/lib/credits';
import { useAuth } from '@/lib/auth-context';
import { toast } from '@/components/ui/use-toast';

function getOrigin() {
  if (typeof window !== 'undefined') {
    return window.location.origin
  }
  const port = process.env.PORT || 3000
  const host = process.env.NEXT_PUBLIC_SITE_URL || `http://localhost:${port}`
  return host
}

interface CreditPurchaseModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onPurchaseComplete?: () => void;
}

export function CreditPurchaseModal({ open, onOpenChange, onPurchaseComplete }: CreditPurchaseModalProps) {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState<number | null>(null);
  const [widgets, setWidgets] = useState<any>(null)

  // 선택된 패키지에 맞춰 v2 결제위젯 렌더링
  useEffect(() => {
    const setup = async () => {
      if (!open || selectedPackage === null) return
      const clientKey = process.env.NEXT_PUBLIC_TOSS_CLIENT_KEY
      if (!clientKey) return
      const pkg = CREDIT_PACKAGES[selectedPackage]

      await loadTossWidget()
      const anyWindow = window as any
      if (!anyWindow.TossPayments) {
        toast({ title: '결제 위젯 로딩 실패', description: 'v2 SDK를 불러오지 못했습니다.', variant: 'destructive' })
        return
      }

      const customerKey = user?.id || 'ANONYMOUS'
      const tossPayments = anyWindow.TossPayments(clientKey)
      // v2 위젯 인스턴스 생성 (amount는 setAmount로 설정)
      const w = tossPayments.widgets({ customerKey })
      try {
        await w.setAmount(pkg.price)
        // 결제 수단 UI 렌더 (금액은 setAmount로 이미 설정됨)
        await w.renderPaymentMethods('#toss-payment-method')
        await w.renderAgreement('#toss-agreement')
        setWidgets(w)
      } catch (e) {
        console.error('Toss widget render error', e)
        toast({ title: '결제 UI 렌더링 오류', description: '결제 수단/약관 영역 렌더링에 실패했습니다.', variant: 'destructive' })
      }
    }
    setup()
    // 모달을 닫거나 패키지를 변경하면 위젯 상태 초기화
    return () => {
      setWidgets(null)
    }
  }, [open, selectedPackage, user?.id])

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
      const clientKey = process.env.NEXT_PUBLIC_TOSS_CLIENT_KEY
      if (!clientKey) {
        toast({ title: '결제 설정 오류', description: '클라이언트 키가 설정되지 않았습니다.', variant: 'destructive' })
        return
      }

      const pkg = CREDIT_PACKAGES[packageIndex]
      const orderId = `${user.id}-${Date.now()}`
      const orderName = pkg.label
      const successUrl = `${getOrigin()}/dashboard/credits/success?credits=${pkg.credits}&orderName=${encodeURIComponent(orderName)}`
      const failUrl = `${getOrigin()}/dashboard/credits/fail`

      // v2 위젯의 결제 요청은 UI 렌더링 이후에 호출
      if (!widgets) {
        toast({ title: '결제 준비 중', description: '결제 UI가 아직 준비되지 않았습니다. 잠시 후 다시 시도하세요.', variant: 'destructive' })
        return
      }

      await widgets.requestPayment({
        orderId,
        orderName,
        successUrl,
        failUrl,
      })
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

                {/* 결제위젯 v2 결제 UI 및 약관 영역 */}
                <div className="space-y-3">
                  <div>
                    <h4 className="text-sm font-medium mb-2">Payment Methods</h4>
                    <div id="toss-payment-method" className="border rounded p-3" />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium mb-2">Agreement</h4>
                    <div id="toss-agreement" className="border rounded p-3" />
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
                  * Toss Payments v2 결제위젯 연동. 결제 UI 렌더 후 결제 요청이 수행됩니다.
                </p>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

async function loadTossWidget() {
  const anyWindow = window as any
  if (anyWindow.TossPayments) return
  // 공식 문서 v2 표준 SDK 로드
  await loadScript('https://js.tosspayments.com/v2/standard')
}

function loadScript(src: string) {
  return new Promise<void>((resolve, reject) => {
    const s = document.createElement('script')
    s.src = src
    s.onload = () => resolve()
    s.onerror = () => reject(new Error('Script load error'))
    document.head.appendChild(s)
  })
}
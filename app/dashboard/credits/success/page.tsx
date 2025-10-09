'use client'

import { useEffect, useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { toast } from '@/components/ui/use-toast'

export default function TossSuccessPage() {
  const params = useSearchParams()
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [creditsAdded, setCreditsAdded] = useState<number | null>(null)

  useEffect(() => {
    const paymentKey = params.get('paymentKey')
    const orderId = params.get('orderId')
    const amountStr = params.get('amount')
    const creditsStr = params.get('credits')
    const orderName = params.get('orderName') || undefined

    if (!paymentKey || !orderId || !amountStr || !creditsStr) {
      setError('Missing payment parameters')
      setLoading(false)
      return
    }

    const amount = Number(amountStr)
    const credits = Number(creditsStr)

    const confirm = async () => {
      try {
        const res = await fetch('/api/payments/toss/confirm', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ paymentKey, orderId, amount, credits, orderName }),
        })
        const data = await res.json()
        if (!res.ok) {
          setError(data?.error || 'Payment confirmation failed')
          toast({ title: '결제 실패', description: data?.error || '승인에 실패했습니다.', variant: 'destructive' })
        } else {
          setCreditsAdded(data.creditsAdded)
          toast({ title: '결제 완료', description: `${data.creditsAdded} 크레딧이 충전되었습니다.` })
        }
      } catch (e) {
        setError('Network error during confirmation')
        toast({ title: '네트워크 오류', description: '승인 요청 중 오류가 발생했습니다.', variant: 'destructive' })
      } finally {
        setLoading(false)
      }
    }

    confirm()
  }, [params])

  return (
    <div className="container mx-auto py-10 px-4">
      <div className="max-w-lg mx-auto text-center space-y-4">
        <h1 className="text-3xl font-bold">결제 결과</h1>
        {loading && <p>승인 처리 중입니다...</p>}
        {!loading && error && (
          <p className="text-red-600">오류: {error}</p>
        )}
        {!loading && !error && (
          <p className="text-green-600">성공적으로 크레딧 {creditsAdded}개가 충전되었습니다.</p>
        )}
        <div className="pt-4">
          <Button onClick={() => router.push('/dashboard/credits')}>크레딧 관리로 이동</Button>
        </div>
      </div>
    </div>
  )
}
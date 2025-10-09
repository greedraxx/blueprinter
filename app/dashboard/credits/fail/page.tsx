'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { Button } from '@/components/ui/button'

export default function TossFailPage() {
  const router = useRouter()
  const params = useSearchParams()
  const message = params.get('message')

  return (
    <div className="container mx-auto py-10 px-4">
      <div className="max-w-lg mx-auto text-center space-y-4">
        <h1 className="text-3xl font-bold">결제 실패</h1>
        <p className="text-gray-700">결제가 정상적으로 완료되지 않았습니다.</p>
        {message && <p className="text-red-600">오류: {message}</p>}
        <div className="pt-4">
          <Button onClick={() => router.push('/dashboard/credits')}>다시 시도하기</Button>
        </div>
      </div>
    </div>
  )
}
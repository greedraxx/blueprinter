'use client'

import { useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { CreditDisplay } from '@/components/dashboard/credit-display'
import { CreditPurchaseModal } from '@/components/dashboard/credit-purchase-modal'

export function CreditsPurchaseEntry() {
  const searchParams = useSearchParams()
  const initialOpen = searchParams.get('purchase') === '1'
  const [open, setOpen] = useState(initialOpen)
  return (
    <>
      <CreditDisplay onPurchaseClick={() => setOpen(true)} />
      <CreditPurchaseModal open={open} onOpenChange={setOpen} onPurchaseComplete={() => {}} />
    </>
  )
}
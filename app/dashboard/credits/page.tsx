import { CreditTest } from "@/components/dashboard/credit-test"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { getUserCreditsSummary, getRecentTransactions } from "@/lib/credits"
import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { CreditsPurchaseEntry } from "@/components/dashboard/credits-purchase-entry"
import type { UserCreditsSummary, CreditTransaction } from "@/types/credits"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default async function CreditsPage() {
  const supabase = await createClient()
  
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/login")
  }

  let creditsSummary: UserCreditsSummary | null = null
  let recentTransactions: CreditTransaction[] = []

  try {
    creditsSummary = await getUserCreditsSummary(user.id)
    recentTransactions = await getRecentTransactions(user.id, 10)
  } catch (error) {
    console.error("Failed to load credit data:", error)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0066FF] via-[#0088FF] to-[#00AAFF]">
      <DashboardHeader />
      <main className="container mx-auto px-4 py-16 max-w-6xl">
        <div className="space-y-8">
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <h1 className="text-5xl font-bold tracking-tight text-white">Credit Management</h1>
              <p className="text-white/90">Manage your credits and track your usage</p>
            </div>
            <Button asChild size="lg" className="bg-black hover:bg-black/90 text-white h-14 px-8 text-base font-bold rounded-full">
              <Link href="/dashboard">Return to Dashboard</Link>
            </Button>
          </div>

          {creditsSummary && <CreditsPurchaseEntry />}

          {/* Credit Test Component */}
          <CreditTest />

          {recentTransactions.length > 0 && (
            <div className="bg-white rounded-lg shadow-2xl p-6">
              <h2 className="text-2xl font-bold mb-4">Recent Transactions</h2>
              <div className="space-y-3">
                {recentTransactions.map((transaction) => (
                  <div key={transaction.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium">{transaction.description}</p>
                      <p className="text-sm text-gray-500">
                        {new Date(transaction.created_at).toLocaleDateString()}
                      </p>
                    </div>
                    <div className={`font-bold ${transaction.amount > 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {transaction.amount > 0 ? '+' : ''}{transaction.amount}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}

// (클라이언트 컴포넌트로 분리됨)
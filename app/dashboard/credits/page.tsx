import { CreditDisplay } from "@/components/dashboard/credit-display"
import { CreditPurchaseModal } from "@/components/dashboard/credit-purchase-modal"
import { CreditTest } from "@/components/dashboard/credit-test"
import { getUserCreditsSummary, getRecentTransactions } from "@/lib/credits"
import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"

export default async function CreditsPage() {
  const supabase = await createClient()
  
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/login")
  }

  let creditsSummary = null
  let recentTransactions = []

  try {
    creditsSummary = await getUserCreditsSummary(user.id)
    recentTransactions = await getRecentTransactions(user.id, 10)
  } catch (error) {
    console.error("Failed to load credit data:", error)
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold">Credit Management</h1>
          <p className="text-gray-600">Manage your credits and track your usage</p>
        </div>

        {creditsSummary && (
          <CreditDisplay 
            credits={creditsSummary.current_credits}
            totalEarned={creditsSummary.total_earned}
            totalSpent={creditsSummary.total_spent}
            onPurchaseClick={() => {}}
          />
        )}

        {/* Credit Test Component */}
        <CreditTest />

        {recentTransactions.length > 0 && (
          <div className="bg-white rounded-lg shadow-lg p-6">
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
                  <div className={`font-bold ${
                    transaction.amount > 0 ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {transaction.amount > 0 ? '+' : ''}{transaction.amount}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
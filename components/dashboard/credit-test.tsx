'use client'

import { useEffect, useState } from 'react'
import { useAuth } from '@/lib/auth-context'
import { getUserCredits, getUserCreditsSummary, getRecentTransactions } from '@/lib/credits'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

export function CreditTest() {
  const { user } = useAuth()
  const [credits, setCredits] = useState<number | null>(null)
  const [summary, setSummary] = useState<any>(null)
  const [transactions, setTransactions] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (user?.id) {
      loadCreditData()
    }
  }, [user?.id])

  const loadCreditData = async () => {
    try {
      setLoading(true)
      setError(null)

      // Load user credits
      const userCredits = await getUserCredits(user!.id)
      setCredits(userCredits?.credits ?? 0)

      // Load credit summary
      const creditSummary = await getUserCreditsSummary(user!.id)
      setSummary(creditSummary)

      // Load recent transactions
      const recentTransactions = await getRecentTransactions(user!.id, 10)
      setTransactions(recentTransactions)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load credit data')
    } finally {
      setLoading(false)
    }
  }

  if (!user) {
    return (
      <Card>
        <CardContent className="p-6">
          <p className="text-gray-500">Please log in to view your credit information.</p>
        </CardContent>
      </Card>
    )
  }

  if (loading) {
    return (
      <Card>
        <CardContent className="p-6">
          <p className="text-gray-500">Loading credit information...</p>
        </CardContent>
      </Card>
    )
  }

  if (error) {
    return (
      <Card>
        <CardContent className="p-6">
          <p className="text-red-500">Error: {error}</p>
          <button 
            onClick={loadCreditData}
            className="mt-2 text-blue-500 hover:text-blue-700 underline"
          >
            Retry
          </button>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      {/* Credit Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Credit Information</CardTitle>
          <CardDescription>Your current credit status</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">{credits ?? 0}</div>
              <div className="text-sm text-gray-600">Current Credits</div>
            </div>
            {summary && (
              <>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">{summary.total_earned ?? 0}</div>
                  <div className="text-sm text-gray-600">Total Earned</div>
                </div>
                <div className="text-center p-4 bg-red-50 rounded-lg">
                  <div className="text-2xl font-bold text-red-600">{summary.total_spent ?? 0}</div>
                  <div className="text-sm text-gray-600">Total Spent</div>
                </div>
              </>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Recent Transactions */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Transactions</CardTitle>
          <CardDescription>Your latest credit transactions</CardDescription>
        </CardHeader>
        <CardContent>
          {transactions.length === 0 ? (
            <p className="text-gray-500">No transactions found.</p>
          ) : (
            <div className="space-y-3">
              {transactions.map((transaction) => (
                <div key={transaction.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <div className="font-medium">{transaction.description || 'No description'}</div>
                    <div className="text-sm text-gray-500">
                      {new Date(transaction.created_at).toLocaleDateString()}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge 
                      variant={transaction.amount > 0 ? 'default' : 'destructive'}
                      className={transaction.amount > 0 ? 'bg-green-500' : 'bg-red-500'}
                    >
                      {transaction.amount > 0 ? '+' : ''}{transaction.amount}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Debug Information */}
      <Card>
        <CardHeader>
          <CardTitle>Debug Information</CardTitle>
          <CardDescription>Technical details for troubleshooting</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 text-sm">
            <div><strong>User ID:</strong> {user.id}</div>
            <div><strong>User Email:</strong> {user.email}</div>
            <div><strong>Raw Credits:</strong> {credits}</div>
            {summary && (
              <>
                <div><strong>Total Earned:</strong> {summary.total_earned}</div>
                <div><strong>Total Spent:</strong> {summary.total_spent}</div>
                <div><strong>Created At:</strong> {summary.created_at}</div>
                <div><strong>Updated At:</strong> {summary.updated_at}</div>
              </>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
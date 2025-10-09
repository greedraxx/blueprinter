'use client'

import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { PrdGenerationForm } from "@/components/dashboard/prd-generation-form"
import { Sparkles } from "lucide-react"
import { useAuth } from "@/lib/auth-context"
import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function DashboardPage() {
  const { user, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!user && !loading) {
      router.push('/login')
    }
  }, [user, loading, router])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0066FF] via-[#0088FF] to-[#00AAFF]">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mx-auto"></div>
          <p className="text-white/90">Loading...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0066FF] via-[#0088FF] to-[#00AAFF]">
      <DashboardHeader />
      <main className="container mx-auto px-4 py-16 max-w-6xl">
        <div className="space-y-12">
          <div className="space-y-4 text-center">
            <div className="flex items-center justify-center gap-3">
              <Sparkles className="h-10 w-10 text-black" />
              <h1 className="text-6xl font-bold tracking-tight text-black">PRINT YOUR IDEA</h1>
            </div>
            <p className="text-2xl text-white/90 max-w-3xl mx-auto">
              Transform your idea into a professional Product Requirements Document in minutes.
            </p>
          </div>

          <PrdGenerationForm />
        </div>
      </main>
    </div>
  )
}

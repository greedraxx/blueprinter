import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { PrdGenerationForm } from "@/components/dashboard/prd-generation-form"
import { Sparkles } from "lucide-react"

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0066FF] via-[#0088FF] to-[#00AAFF]">
      <DashboardHeader />
      <main className="container mx-auto px-4 py-16 max-w-6xl">
        <div className="space-y-12">
          <div className="space-y-4 text-center">
            <div className="flex items-center justify-center gap-3">
              <Sparkles className="h-10 w-10 text-white" />
              <h1 className="text-6xl font-bold tracking-tight text-white">GENERATE PRD</h1>
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

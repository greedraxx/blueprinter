import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { PrdList } from "@/components/dashboard/prd-list"
import { FileText } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function PrdsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0066FF] via-[#0088FF] to-[#00AAFF]">
      <DashboardHeader />
      <main className="container mx-auto px-4 py-16 max-w-6xl">
        <div className="space-y-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <FileText className="h-8 w-8 text-white" />
                <h1 className="text-5xl font-bold tracking-tight text-white">MY PRDs</h1>
              </div>
              <p className="text-xl text-white/90">
                View, edit, and manage your generated Product Requirements Documents
              </p>
            </div>
            <Button
              asChild
              size="lg"
              className="bg-black hover:bg-black/90 text-white h-14 px-8 text-base font-bold rounded-full"
            >
              <Link href="/dashboard">Generate New PRD</Link>
            </Button>
          </div>

          <PrdList />
        </div>
      </main>
    </div>
  )
}

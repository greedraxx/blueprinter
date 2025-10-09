import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { PrdEditor } from "@/components/dashboard/prd-editor"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Download } from "lucide-react"
import Link from "next/link"

export default async function PrdDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  
  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />
      <main className="container mx-auto px-4 py-8 max-w-5xl">
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <Button variant="ghost" size="sm" asChild className="gap-2">
              <Link href="/dashboard/prds">
                <ArrowLeft className="h-4 w-4" />
                Back to PRDs
              </Link>
            </Button>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="gap-2 bg-transparent">
                <Download className="h-4 w-4" />
                Download MD
              </Button>
              <Button variant="outline" size="sm" className="gap-2 bg-transparent">
                <Download className="h-4 w-4" />
                Download PDF
              </Button>
            </div>
          </div>

          <PrdEditor prdId={id} />
        </div>
      </main>
    </div>
  )
}

"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { MoreVertical, Eye, Download, FileText, Trash2, Calendar, Globe, Loader2 } from "lucide-react"
import Link from "next/link"

interface Prd {
  id: string
  title: string
  createdAt: string
  platform: string
  contentEn?: string
  contentKo?: string
}

export function PrdList() {
  const [prds, setPrds] = useState<Prd[]>([])
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    loadPrds()
  }, [])

  const loadPrds = async () => {
    try {
      const response = await fetch("/api/prds")
      const data = await response.json()
      setPrds(data.prds || [])
    } catch (error) {
      console.error("Error loading PRDs:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    try {
      await fetch(`/api/prds/${id}`, { method: "DELETE" })
      setPrds(prds.filter((prd) => prd.id !== id))
      setDeleteId(null)
    } catch (error) {
      console.error("Error deleting PRD:", error)
      alert("Failed to delete PRD")
    }
  }

  const handleDownload = async (id: string, format: "md" | "pdf") => {
    try {
      const response = await fetch(`/api/prds/${id}`)
      const { prd } = await response.json()

      const content = `# ${prd.title}\n\n## English Version\n\n${prd.contentEn}\n\n---\n\n## Korean Version (한국어)\n\n${prd.contentKo}`

      // Create and download file
      const blob = new Blob([content], { type: "text/markdown" })
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = `${prd.title.replace(/[^a-z0-9]/gi, "_")}_PRD.md`
      document.body.appendChild(a)
      a.click()
      window.URL.revokeObjectURL(url)
      document.body.removeChild(a)
    } catch (error) {
      console.error("Error downloading PRD:", error)
      alert("Failed to download PRD")
    }
  }

  if (isLoading) {
    return (
      <Card className="border-0 bg-white shadow-2xl">
        <CardContent className="flex flex-col items-center justify-center py-20">
          <Loader2 className="h-12 w-12 animate-spin text-[#0066FF]" />
          <p className="mt-4 text-lg text-gray-600">Loading PRDs...</p>
        </CardContent>
      </Card>
    )
  }

  if (prds.length === 0) {
    return (
      <Card className="border-0 bg-white shadow-2xl">
        <CardContent className="flex flex-col items-center justify-center py-20 text-center">
          <FileText className="h-16 w-16 text-gray-400 mb-6" />
          <h3 className="text-2xl font-bold mb-3">No PRDs yet</h3>
          <p className="text-lg text-gray-600 mb-8 max-w-md">
            You haven't generated any Product Requirements Documents yet. Start by creating your first PRD.
          </p>
          <Button
            asChild
            size="lg"
            className="bg-[#0066FF] hover:bg-[#0052CC] text-white h-14 px-8 text-base font-bold rounded-full"
          >
            <Link href="/dashboard">Generate Your First PRD</Link>
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <>
      <div className="space-y-6">
        {prds.map((prd) => (
          <Card key={prd.id} className="border-0 bg-white shadow-2xl hover:shadow-3xl transition-shadow">
            <CardContent className="p-8">
              <div className="flex items-start justify-between gap-6">
                <div className="flex-1 space-y-4">
                  <div className="space-y-2">
                    <h3 className="text-2xl font-bold">{prd.title}</h3>
                    <div className="flex flex-wrap items-center gap-4 text-base text-gray-600">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        <span>{new Date(prd.createdAt).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Globe className="h-4 w-4" />
                        <span>English & Korean</span>
                      </div>
                      <Badge variant="secondary" className="text-sm font-bold">
                        {prd.platform}
                      </Badge>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-3">
                    <Button
                      size="lg"
                      className="gap-2 bg-[#0066FF] hover:bg-[#0052CC] text-white font-bold rounded-full"
                      asChild
                    >
                      <Link href={`/dashboard/prds/${prd.id}`}>
                        <Eye className="h-4 w-4" />
                        View & Edit
                      </Link>
                    </Button>
                    <Button
                      size="lg"
                      variant="outline"
                      className="gap-2 font-bold rounded-full bg-transparent"
                      onClick={() => handleDownload(prd.id, "md")}
                    >
                      <Download className="h-4 w-4" />
                      Download MD
                    </Button>
                    <Button
                      size="lg"
                      variant="outline"
                      className="gap-2 font-bold rounded-full bg-transparent"
                      onClick={() => handleDownload(prd.id, "pdf")}
                    >
                      <Download className="h-4 w-4" />
                      Download PDF
                    </Button>
                  </div>
                </div>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="h-10 w-10 p-0">
                      <MoreVertical className="h-5 w-5" />
                      <span className="sr-only">Open menu</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem asChild>
                      <Link href={`/dashboard/prds/${prd.id}`} className="flex items-center gap-2">
                        <Eye className="h-4 w-4" />
                        View & Edit
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleDownload(prd.id, "md")} className="flex items-center gap-2">
                      <Download className="h-4 w-4" />
                      Download Markdown
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleDownload(prd.id, "pdf")} className="flex items-center gap-2">
                      <Download className="h-4 w-4" />
                      Download PDF
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={() => setDeleteId(prd.id)}
                      className="flex items-center gap-2 text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <AlertDialog open={deleteId !== null} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your PRD and remove it from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => deleteId && handleDelete(deleteId)}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}

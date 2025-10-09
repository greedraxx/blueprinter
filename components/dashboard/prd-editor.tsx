"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Save, Loader2 } from "lucide-react"

interface Prd {
  id: string
  title: string
  contentEn: string
  contentKo: string
}

export function PrdEditor({ prdId }: { prdId: string }) {
  const [prd, setPrd] = useState<Prd | null>(null)
  const [contentEn, setContentEn] = useState("")
  const [contentKo, setContentKo] = useState("")
  const [isSaving, setIsSaving] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    loadPrd()
  }, [prdId])

  const loadPrd = async () => {
    try {
      const response = await fetch(`/api/prds/${prdId}`)
      const data = await response.json()
      setPrd(data.prd)
      setContentEn(data.prd.contentEn || "")
      setContentKo(data.prd.contentKo || "")
    } catch (error) {
      console.error("Error loading PRD:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSave = async () => {
    setIsSaving(true)
    try {
      await fetch(`/api/prds/${prdId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ contentEn, contentKo }),
      })
      alert("PRD saved successfully!")
    } catch (error) {
      console.error("Error saving PRD:", error)
      alert("Failed to save PRD")
    } finally {
      setIsSaving(false)
    }
  }

  if (isLoading) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center py-20">
          <Loader2 className="h-12 w-12 animate-spin" />
        </CardContent>
      </Card>
    )
  }

  if (!prd) {
    return (
      <Card>
        <CardContent className="py-20 text-center">
          <p className="text-lg text-muted-foreground">PRD not found</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>{prd.title}</CardTitle>
            <CardDescription>Edit your Product Requirements Document</CardDescription>
          </div>
          <Button onClick={handleSave} disabled={isSaving} className="gap-2">
            <Save className="h-4 w-4" />
            {isSaving ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="en" className="w-full">
          <TabsList className="grid w-full grid-cols-2 max-w-md">
            <TabsTrigger value="en">English</TabsTrigger>
            <TabsTrigger value="ko">한국어</TabsTrigger>
          </TabsList>
          <TabsContent value="en" className="mt-6">
            <Textarea
              value={contentEn}
              onChange={(e) => setContentEn(e.target.value)}
              className="min-h-[600px] font-mono text-sm bg-secondary/50 resize-none"
              placeholder="English PRD content..."
            />
          </TabsContent>
          <TabsContent value="ko" className="mt-6">
            <Textarea
              value={contentKo}
              onChange={(e) => setContentKo(e.target.value)}
              className="min-h-[600px] font-mono text-sm bg-secondary/50 resize-none"
              placeholder="한국어 PRD 내용..."
            />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

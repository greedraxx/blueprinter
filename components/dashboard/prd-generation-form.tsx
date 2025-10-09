"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Sparkles, Loader2, AlertCircle } from "lucide-react"
import { getUserCredits } from "@/lib/credits"
import { InsufficientCreditsError } from "@/types/credits"
import { useAuth } from "@/lib/auth-context"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

export function PrdGenerationForm() {
  const { user } = useAuth()
  const [isGenerating, setIsGenerating] = useState(false)
  const [userCredits, setUserCredits] = useState<number | null>(null)
  const [isLoadingCredits, setIsLoadingCredits] = useState(true)
  const [showCreditModal, setShowCreditModal] = useState(false)
  const [formData, setFormData] = useState({
    title: "",
    idea: "",
    platform: "",
    targetAudience: "",
    coreFeatures: "",
    monetization: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Check if user has enough credits
    if (userCredits === null || userCredits < 1) {
      setShowCreditModal(true)
      return
    }
    
    setIsGenerating(true)

    try {
      // Call Gemini API to generate PRD
      const response = await fetch("/api/generate-prd", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        const error = await response.json()
        if (response.status === 402) {
          // Insufficient credits
          setShowCreditModal(true)
          throw new Error("Insufficient credits")
        }
        throw new Error(error.error || "Failed to generate PRD")
      }

      const { prd } = await response.json()

      // Save PRD to storage
      await fetch("/api/prds", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(prd),
      })

      // Redirect to PRD view
      window.location.href = `/dashboard/prds/${prd.id}`
    } catch (error) {
      console.error("Error generating PRD:", error)
      alert(error instanceof Error ? error.message : "Failed to generate PRD. Please try again.")
      setIsGenerating(false)
    }
  }

  // Load user credits on component mount
  useEffect(() => {
    const loadUserCredits = async () => {
      if (!user) {
        setIsLoadingCredits(false)
        return
      }

      try {
        const credits = await getUserCredits(user.id)
        setUserCredits(credits?.credits ?? 0)
      } catch (error) {
        console.error("Failed to load user credits:", error)
        setUserCredits(0)
      } finally {
        setIsLoadingCredits(false)
      }
    }

    loadUserCredits()
  }, [user])

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-6">
        <Card className="border-0 bg-white shadow-2xl">
          <CardHeader className="pb-8">
            <CardTitle className="text-3xl font-bold">Project Information</CardTitle>
            <CardDescription className="text-lg text-gray-600">Tell us about your project idea</CardDescription>
          </CardHeader>
          <CardContent className="space-y-8">
            <div className="space-y-3">
              <Label htmlFor="title" className="text-lg font-bold">
                Project Title <span className="text-[#0066FF]">*</span>
              </Label>
              <Input
                id="title"
                placeholder="e.g., AI-Powered Task Manager"
                value={formData.title}
                onChange={(e) => handleInputChange("title", e.target.value)}
                required
                className="bg-gray-50 border-gray-200 h-14 text-lg"
              />
            </div>

            <div className="space-y-3">
              <Label htmlFor="idea" className="text-lg font-bold">
                Your Idea <span className="text-[#0066FF]">*</span>
              </Label>
              <Textarea
                id="idea"
                placeholder="Describe your service idea in detail. What problem does it solve? Who is it for? What makes it unique?"
                value={formData.idea}
                onChange={(e) => handleInputChange("idea", e.target.value)}
                required
                minLength={50}
                rows={10}
                className="bg-gray-50 border-gray-200 resize-none text-lg"
              />
              <p className="text-base text-gray-500">Minimum 50 characters ({formData.idea.length}/50)</p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 bg-white shadow-2xl">
          <CardHeader className="pb-8">
            <CardTitle className="text-3xl font-bold">Detailed Settings</CardTitle>
            <CardDescription className="text-lg text-gray-600">Help us understand your project better</CardDescription>
          </CardHeader>
          <CardContent className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <Label htmlFor="platform" className="text-lg font-bold">
                  Platform
                </Label>
                <Select value={formData.platform} onValueChange={(value) => handleInputChange("platform", value)}>
                  <SelectTrigger id="platform" className="bg-gray-50 border-gray-200 h-14 text-lg">
                    <SelectValue placeholder="Select platform" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="web">Web</SelectItem>
                    <SelectItem value="ios">Mobile App (iOS)</SelectItem>
                    <SelectItem value="android">Mobile App (Android)</SelectItem>
                    <SelectItem value="cross-platform">Cross-Platform</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-3">
                <Label htmlFor="targetAudience" className="text-lg font-bold">
                  Target Audience
                </Label>
                <Select
                  value={formData.targetAudience}
                  onValueChange={(value) => handleInputChange("targetAudience", value)}
                >
                  <SelectTrigger id="targetAudience" className="bg-gray-50 border-gray-200 h-14 text-lg">
                    <SelectValue placeholder="Select audience" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="gen-z">Gen Z</SelectItem>
                    <SelectItem value="millennials">Millennials</SelectItem>
                    <SelectItem value="professionals">Professionals</SelectItem>
                    <SelectItem value="students">Students</SelectItem>
                    <SelectItem value="general">General Public</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-3">
              <Label htmlFor="coreFeatures" className="text-lg font-bold">
                Core Features
              </Label>
              <Input
                id="coreFeatures"
                placeholder="e.g., #login, #chat, #payment, #notifications"
                value={formData.coreFeatures}
                onChange={(e) => handleInputChange("coreFeatures", e.target.value)}
                className="bg-gray-50 border-gray-200 h-14 text-lg"
              />
              <p className="text-base text-gray-500">Use hashtags to separate features</p>
            </div>

            <div className="space-y-3">
              <Label htmlFor="monetization" className="text-lg font-bold">
                Monetization Model
              </Label>
              <Select value={formData.monetization} onValueChange={(value) => handleInputChange("monetization", value)}>
                <SelectTrigger id="monetization" className="bg-gray-50 border-gray-200 h-14 text-lg">
                  <SelectValue placeholder="Select model" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">None (Free/Personal)</SelectItem>
                  <SelectItem value="subscription">Subscription</SelectItem>
                  <SelectItem value="ads">Advertisements</SelectItem>
                  <SelectItem value="in-app">In-app Purchases</SelectItem>
                  <SelectItem value="freemium">Freemium</SelectItem>
                  <SelectItem value="one-time">One-time Payment</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 bg-white shadow-2xl">
          <CardContent className="pt-8">
            <div className="flex items-start gap-4">
              <Checkbox id="languages" defaultChecked disabled className="border-[#0066FF] mt-1" />
              <div className="space-y-2">
                <label htmlFor="languages" className="text-lg font-bold leading-none">
                  Generate in multiple languages
                </label>
                <p className="text-base text-gray-600">
                  Your PRD will be generated in both English and Korean simultaneously
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-8">
          <div className="text-lg text-white">
            {isLoadingCredits ? (
              <span className="text-gray-300">Loading credits...</span>
            ) : userCredits !== null ? (
              <>
                <span className="font-bold">1 credit</span> will be used for this generation
                <span className="ml-2 text-sm bg-white/20 px-2 py-1 rounded">
                  Available: {userCredits} credits
                </span>
              </>
            ) : (
              <span className="text-red-300">Unable to load credits</span>
            )}
          </div>
          <Button
            type="submit"
            size="lg"
            disabled={isGenerating || formData.idea.length < 50 || userCredits === null || userCredits < 1}
            className="gap-3 bg-black hover:bg-black/90 text-white h-16 px-12 text-lg font-bold rounded-full shadow-2xl"
          >
            {isGenerating ? (
              <>
                <Loader2 className="h-6 w-6 animate-spin" />
                Generating PRD...
              </>
            ) : (
              <>
                <Sparkles className="h-6 w-6" />
                Generate PRD
              </>
            )}
          </Button>
        </div>
      </form>

      <Dialog open={showCreditModal} onOpenChange={setShowCreditModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-orange-500" />
              Insufficient Credits
            </DialogTitle>
            <DialogDescription>
              {userCredits === null 
                ? "Unable to load your credit balance. Please try again."
                : userCredits === 0 
                ? "You don't have any credits left. Purchase credits to continue generating PRDs."
                : "You don't have enough credits to generate a PRD. Purchase more credits to continue."
              }
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="sm:justify-start">
            <Button
              type="button"
              variant="outline"
              onClick={() => setShowCreditModal(false)}
            >
              Cancel
            </Button>
            <Button
              type="button"
              onClick={() => {
                setShowCreditModal(false)
                window.location.href = '/dashboard/credits'
              }}
              className="bg-[#0066FF] hover:bg-[#0066FF]/90"
            >
              Purchase Credits
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}

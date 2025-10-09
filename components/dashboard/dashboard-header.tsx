"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { CreditCard, FileText, LogOut } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { LanguageSelector } from "@/components/language-selector"
import { useLanguage } from "@/lib/language-context"
import { useAuth } from "@/lib/auth-context"
import { toast } from "@/components/ui/use-toast"
import { getUserCredits } from "@/lib/credits"
import Image from "next/image"

export function DashboardHeader() {
  const { t } = useLanguage()
  const router = useRouter()
  const { user, signOut } = useAuth()
  const [userCredits, setUserCredits] = useState<number | null>(null)
  const [isLoadingCredits, setIsLoadingCredits] = useState(true)

  useEffect(() => {
    if (user?.id) {
      getUserCredits(user.id)
        .then((uc) => setUserCredits(uc?.credits ?? 0))
        .catch(() => setUserCredits(0))
        .finally(() => setIsLoadingCredits(false))
    }
  }, [user?.id])

  const handleLogout = async () => {
    try {
      await signOut()
      toast({
        title: "Success",
        description: "Successfully logged out!",
      })
      router.push('/login')
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to sign out",
        variant: "destructive",
      })
    }
  }

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-black/20 backdrop-blur-md">
      <div className="container mx-auto flex h-20 items-center justify-between px-6">
        <div className="flex items-center gap-12">
          <Link href="/dashboard" className="flex items-center">
            <Image
              src="/logo.png"
              alt="BLUE PRINTER"
              width={200}
              height={50}
              className="h-12 w-auto"
              priority
            />
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            <Link href="/dashboard" className="text-2xl font-medium text-white hover:text-white/80 transition-colors">
              {t("dashboard.generate")}
            </Link>
            <Link href="/dashboard/prds" className="text-2xl text-white/70 hover:text-white transition-colors">
              {t("dashboard.myPrds")}
            </Link>
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 rounded-full bg-white px-4 py-2">
            <CreditCard className="h-5 w-5 text-[#0066FF]" />
            <span className="font-bold text-black">
              {isLoadingCredits ? "..." : userCredits ?? 0} {t("dashboard.credits")}
            </span>
          </div>

          <LanguageSelector />

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="gap-2 hover:bg-white/10 text-white">
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="bg-white text-[#0066FF] text-xs font-bold">
                    {user?.email?.slice(0, 2).toUpperCase() || 'JD'}
                  </AvatarFallback>
                </Avatar>
                <span className="hidden sm:inline text-sm font-medium">
                  {user?.email?.split('@')[0] || 'User'}
                </span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem asChild>
                <Link href="/dashboard/prds" className="flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  {t("dashboard.myPrds")}
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/dashboard/credits" className="flex items-center gap-2">
                  <CreditCard className="h-4 w-4" />
                  {t("dashboard.buyCredits")}
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem 
                className="flex items-center gap-2 text-destructive cursor-pointer"
                onClick={handleLogout}
              >
                <LogOut className="h-4 w-4" />
                {t("dashboard.signOut")}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}

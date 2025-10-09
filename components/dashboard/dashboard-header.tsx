"use client"

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
import Image from "next/image"

export function DashboardHeader() {
  const { t } = useLanguage()
  const router = useRouter()

  const handleLogout = () => {
    // Clear any auth data from localStorage/sessionStorage
    if (typeof window !== 'undefined') {
      localStorage.clear()
      sessionStorage.clear()
    }
    // Redirect to login page
    router.push('/login')
  }

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-black/20 backdrop-blur-md">
      <div className="container mx-auto flex h-20 items-center justify-between px-6">
        <div className="flex items-center gap-12">
          <Link href="/dashboard" className="flex items-center">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/%EC%A0%9C%EB%AA%A9%EC%9D%84%20%EC%9E%85%EB%A0%A5%ED%95%B4%EC%A3%BC%EC%84%B8%EC%9A%94.%20%282%29-AmRyZV3kECzAVT7EZbVDicXl5mxZp4.png"
              alt="BLUE PRINTER"
              width={800}
              height={171}
              className="h-20 w-auto brightness-0 invert"
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
          <div className="hidden sm:flex items-center gap-2 rounded-full bg-white px-6 py-3">
            <CreditCard className="h-6 w-6 text-[#0066FF]" />
            <span className="text-xl font-bold text-black">10 {t("dashboard.credits")}</span>
          </div>

          <LanguageSelector />

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="gap-2 hover:bg-white/10 text-white">
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="bg-white text-[#0066FF] text-xs font-bold">JD</AvatarFallback>
                </Avatar>
                <span className="hidden sm:inline text-sm font-medium">John Doe</span>
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

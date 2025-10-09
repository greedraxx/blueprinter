"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { LanguageSelector } from "@/components/language-selector"
import { useLanguage } from "@/lib/language-context"
import { Menu } from "lucide-react"
import Image from "next/image"

export function Header() {
  const { t } = useLanguage()

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/60 backdrop-blur-sm">
      <div className="container mx-auto flex h-16 md:h-18 items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex items-center flex-shrink-0">
          <Image
            src="/logo.png"
            alt="BLUE PRINTER"
            width={1200}
            height={300}
            className="h-8 md:h-10 w-auto object-contain"
            priority
          />
        </Link>

        <nav className="hidden lg:flex items-center gap-4 xl:gap-6">
          <Link href="#features" className="text-sm lg:text-base font-medium hover:text-black transition-colors whitespace-nowrap">
            Platform
          </Link>
          <Link href="#pricing" className="text-sm lg:text-base font-medium hover:text-black transition-colors whitespace-nowrap">
            Pricing
          </Link>
          <Link href="#about" className="text-sm lg:text-base font-medium hover:text-black transition-colors whitespace-nowrap">
            About us
          </Link>
          <Link href="#blog" className="text-sm lg:text-base font-medium hover:text-black transition-colors whitespace-nowrap">
            Blog
          </Link>
        </nav>

        <div className="flex items-center gap-2 md:gap-3">
          <LanguageSelector />
          <Button variant="ghost" size="sm" className="hidden md:inline-flex font-medium text-sm" asChild>
            <Link href="/login">Login</Link>
          </Button>
          <Button size="sm" className="bg-[#0066FF] hover:bg-[#0052CC] text-white rounded-md px-4 md:px-6 font-bold text-sm" asChild>
            <Link href="/signup">Start Trial</Link>
          </Button>
          <Button variant="ghost" size="icon" className="lg:hidden h-9 w-9">
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  )
}

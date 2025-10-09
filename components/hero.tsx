"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"

export function Hero() {
  const [typedText, setTypedText] = useState("")
  const [currentSection, setCurrentSection] = useState(0)
  
  const prdSections = [
    { title: "# Executive Summary", content: "A revolutionary AI-powered platform that transforms ideas into comprehensive PRDs..." },
    { title: "## Product Overview", content: "Our platform leverages advanced AI to analyze project requirements and generate detailed documentation..." },
    { title: "## Key Features", content: "• AI-powered content generation\n• Multi-language support\n• Real-time collaboration" },
    { title: "## Tech Stack", content: "Frontend: Next.js, React, TypeScript\nBackend: Node.js, Python\nAI: Gemini 2.5 Flash" },
    { title: "## System Architecture", content: "```\nClient Layer\n  ↓\nAPI Gateway\n  ↓\nAI Service\n  ↓\nDatabase\n```" },
  ]

  useEffect(() => {
    const section = prdSections[currentSection]
    const fullText = `${section.title}\n\n${section.content}`
    let index = 0

    const typingInterval = setInterval(() => {
      if (index <= fullText.length) {
        setTypedText(fullText.slice(0, index))
        index++
      } else {
        clearInterval(typingInterval)
        setTimeout(() => {
          setCurrentSection((prev) => (prev + 1) % prdSections.length)
          setTypedText("")
        }, 2000)
      }
    }, 30)

    return () => clearInterval(typingInterval)
  }, [currentSection])

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      <div className="absolute inset-0 bg-gradient-to-br from-[#0066FF] via-[#0099FF] to-[#00CCFF]" />

      <div className="relative z-10 container mx-auto max-w-7xl px-6 py-20">
        <div className="grid lg:grid-cols-2 gap-24 items-center">
          {/* Left: Bold Typography */}
          <div className="space-y-8 lg:pr-8">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-black tracking-tight leading-[0.95] uppercase">
              TRANSFORM
              <br />
              IDEAS INTO
              <br />
              PROFESSIONAL <span className="text-white">PRD</span>S
              <br />
              WITH AI POWERED
            </h1>

            <p className="text-xl md:text-2xl leading-relaxed max-w-xl">
              Blueprinter transforms your ideas into professional, production-ready PRDs ready for immediate implementation.
            </p>

            <div className="pt-8 flex gap-4">
              <Button
                size="lg"
                className="bg-black hover:bg-black/90 text-white rounded-lg px-32 py-8 text-2xl md:text-3xl font-bold flex items-center gap-4 shadow-2xl"
                asChild
              >
                <Link href="/signup">
                  TRY NOW
                  <ArrowRight className="h-7 w-7 md:h-8 md:w-8" />
                </Link>
              </Button>
            </div>
          </div>

          {/* Right: Animated PRD Writing */}
          <div className="relative hidden lg:block">
            {/* VS Code Style Editor with Dark Theme */}
            <div className="relative bg-[#1E1E1E] rounded-2xl shadow-2xl overflow-hidden h-[750px] border border-gray-700/50">
              {/* Editor Header */}
              <div className="flex items-center justify-between px-6 py-3 bg-[#252526] border-b border-gray-700/50">
                <div className="flex items-center gap-4">
                  <div className="flex gap-2">
                    <div className="h-3 w-3 rounded-full bg-[#FF5F56] hover:bg-[#FF5F56]/80 transition-colors cursor-pointer" />
                    <div className="h-3 w-3 rounded-full bg-[#FFBD2E] hover:bg-[#FFBD2E]/80 transition-colors cursor-pointer" />
                    <div className="h-3 w-3 rounded-full bg-[#27C93F] hover:bg-[#27C93F]/80 transition-colors cursor-pointer" />
                  </div>
                  <div className="flex items-center gap-2 pl-4 border-l border-gray-700/50">
                    <svg className="h-4 w-4 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
                    </svg>
                    <span className="text-sm font-medium text-gray-300">PRD_document.md</span>
                    <div className="ml-2 h-1.5 w-1.5 rounded-full bg-blue-400" />
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2 px-3 py-1 bg-green-500/10 rounded-md border border-green-500/30">
                    <div className="h-2 w-2 rounded-full bg-green-400 animate-pulse shadow-lg shadow-green-400/50" />
                    <span className="text-xs text-green-400 font-medium">AI Generating</span>
                  </div>
                </div>
              </div>

              {/* Line Numbers + Content */}
              <div className="flex h-[calc(100%-120px)]">
                {/* Line Numbers */}
                <div className="bg-[#1E1E1E] text-gray-600 text-right pr-4 pl-4 py-6 select-none font-mono text-base leading-relaxed border-r border-gray-700/30">
                  {Array.from({ length: 40 }, (_, i) => (
                    <div key={i}>{i + 1}</div>
                  ))}
                </div>
                
                {/* Editor Content */}
                <div className="flex-1 overflow-auto px-8 py-6">
                  <pre className="font-mono text-lg leading-relaxed">
                    <code className="text-gray-300 whitespace-pre-wrap break-words">
                      {typedText.split('\n').map((line, idx) => {
                        if (line.startsWith('# ')) {
                          return <div key={idx} className="text-blue-400 font-bold text-3xl mb-4">{line}</div>
                        } else if (line.startsWith('## ')) {
                          return <div key={idx} className="text-cyan-400 font-semibold text-2xl mb-3 mt-4">{line}</div>
                        } else if (line.startsWith('```')) {
                          return <div key={idx} className="text-orange-400 text-xl">{line}</div>
                        } else if (line.startsWith('• ') || line.startsWith('- ')) {
                          return <div key={idx} className="text-green-400 text-xl">{line}</div>
                        } else if (line.includes(':')) {
                          return <div key={idx} className="text-purple-300 text-xl">{line}</div>
                        } else {
                          return <div key={idx} className="text-gray-300 text-xl">{line || '\u00A0'}</div>
                        }
                      })}
                      <span className="inline-block w-3 h-7 bg-blue-400 animate-pulse ml-1 shadow-lg shadow-blue-400/50" />
                    </code>
                  </pre>
                </div>
              </div>

              {/* Status Bar */}
              <div className="absolute bottom-0 left-0 right-0 bg-[#007ACC] px-6 py-2 flex items-center justify-between text-xs text-white">
                <div className="flex items-center gap-6">
                  <span className="opacity-90">Markdown</span>
                  <div className="h-3 w-px bg-white/30" />
                  <span className="opacity-90">UTF-8</span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="opacity-90">Ln {typedText.split('\n').length}, Col {typedText.split('\n').slice(-1)[0]?.length || 0}</span>
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{currentSection + 1}/{prdSections.length}</span>
                    <div className="w-24 h-1.5 bg-white/20 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-white transition-all duration-300 rounded-full"
                        style={{ width: `${((currentSection + 1) / prdSections.length) * 100}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Sparkle Effects */}
            <div className="absolute top-10 right-10 animate-pulse">
              <div className="h-2 w-2 bg-cyan-400 rounded-full shadow-lg shadow-cyan-400/50" />
            </div>
            <div className="absolute top-32 right-24 animate-pulse delay-100">
              <div className="h-1.5 w-1.5 bg-blue-400 rounded-full shadow-lg shadow-blue-400/50" />
            </div>
            <div className="absolute top-56 right-16 animate-pulse delay-200">
              <div className="h-2 w-2 bg-purple-400 rounded-full shadow-lg shadow-purple-400/50" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

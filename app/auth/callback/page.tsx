'use client'

import { useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { toast } from '@/components/ui/use-toast'

export default function AuthCallback() {
  const router = useRouter()
  const searchParams = useSearchParams()

  useEffect(() => {
    const handleAuthCallback = async () => {
      try {
        // Initialize Supabase client
        const supabase = createClient()
        
        // Check for auth callback parameters
        const code = searchParams.get('code')
        const next = searchParams.get('next') || '/dashboard'
        const isNewUser = searchParams.get('is_new_user') === 'true'
        
        if (code) {
          // Exchange code for session
          const { data, error } = await supabase.auth.exchangeCodeForSession(code)
          
          if (error) throw error
          
          if (data.session) {
            // 새 사용자에게는 트리거로 10 크레딧이 자동 지급됩니다 (Supabase)
            if (isNewUser) {
              toast({
                title: "Welcome!",
                description: "가입 보너스로 10 크레딧이 지급되었습니다.",
              })
            }
            
            toast({
              title: "Success",
              description: "Successfully logged in!",
            })
            router.push(next)
            return
          }
        }
        
        // If no code, check for existing session
        const { data: { session } } = await supabase.auth.getSession()
        if (session) {
          toast({
            title: "Success",
            description: "Successfully logged in!",
          })
          router.push(next)
          return
        }
        
        // If no session found, redirect to login
        throw new Error('No authentication session found')
        
      } catch (error: any) {
        toast({
          title: "Error",
          description: error.message || "Authentication failed",
          variant: "destructive",
        })
        router.push('/login')
      }
    }

    handleAuthCallback()
  }, [router, searchParams])

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center space-y-4">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
        <p className="text-muted-foreground">Completing authentication...</p>
      </div>
    </div>
  )
}
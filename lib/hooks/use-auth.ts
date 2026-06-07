"use client"

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { useAuthStore } from "@/lib/store/auth-store"
import { loginApi } from "@/lib/api/auth"

export function useAuth() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { userInfo, accessToken, setAuth, clearAuth } = useAuthStore()
  const [isLoading, setIsLoading] = useState(false)

  const isLogin = !!accessToken

  const login = async (username: string, password: string) => {
    setIsLoading(true)
    try {
      const result = await loginApi({ username, password })
      const { accessToken, refreshToken, userInfo } = result.data
      setAuth(accessToken, refreshToken, userInfo)
      document.cookie = `cloudtea-token=${accessToken}; path=/; max-age=86400; SameSite=Lax`
      const redirect = searchParams.get("redirect") || "/"
      router.push(redirect)
    } finally {
      setIsLoading(false)
    }
  }

  const logout = () => {
    clearAuth()
    document.cookie = "cloudtea-token=; path=/; max-age=0"
    router.push("/login")
  }

  return { userInfo, isLogin, login, logout, isLoading }
}

import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { UserInfo } from '@/types/auth'

interface AuthState {
  accessToken: string
  refreshToken: string
  userInfo: UserInfo | null
  setAuth: (accessToken: string, refreshToken: string, userInfo: UserInfo) => void
  clearAuth: () => void
  isLogin: () => boolean
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      accessToken: '',
      refreshToken: '',
      userInfo: null,
      setAuth: (accessToken, refreshToken, userInfo) =>
        set({ accessToken, refreshToken, userInfo }),
      clearAuth: () =>
        set({ accessToken: '', refreshToken: '', userInfo: null }),
      isLogin: () => !!get().accessToken,
    }),
    {
      name: 'cloudtea-auth',
      partialize: (state) => ({
        accessToken: state.accessToken,
        refreshToken: state.refreshToken,
        userInfo: state.userInfo,
      }),
    }
  )
)

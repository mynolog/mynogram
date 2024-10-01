import { create } from 'zustand'
import type { User } from 'firebase/auth'

type AuthState = {
  isAuthenticated: boolean
  setIsAuthenticated: (isAuthenticated: boolean) => void
  user: User | null
  setUser: (user: User | null) => void
  needSignUp: boolean
  setNeedSignUp: (needSignUp: boolean) => void
  uid: string | null
  setUid: (uid: string | null) => void
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  needSignUp: true,
  uid: null,
  setUser: (user: User | null) => set({ user }),
  setIsAuthenticated: (isAuthenticated) => set({ isAuthenticated }),
  setNeedSignUp: (needSignUp) => set({ needSignUp }),
  setUid: (uid) => set({ uid }),
}))

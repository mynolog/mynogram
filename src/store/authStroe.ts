import { create } from 'zustand'
import type { User } from 'firebase/auth'

type AuthState = {
  isAuthenticated: boolean
  setIsAuthenticated: (isAuthenticated: boolean) => void
  user: User | null
  setUser: (user: User | null) => void
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  setUser: (user: User | null) => set({ user }),
  setIsAuthenticated: (isAuthenticated) => set({ isAuthenticated }),
}))

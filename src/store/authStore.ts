import type { User } from 'firebase/auth'
import type { UserProfile } from '../types/user/UserTypes.ts'
import { create } from 'zustand'

type AuthState = {
  isAuthenticated: boolean
  setIsAuthenticated: (isAuthenticated: boolean) => void
  user: User | null
  setUser: (user: User | null) => void
  isSignUpRequired: boolean
  setIsSignUpRequired: (isSignUpRequired: boolean) => void
  uid: string | null
  setUid: (uid: string | null) => void
  userProfile: UserProfile | null
  setUserProfile: (userProfile: UserProfile | null) => void
}

export const useAuthStore = create<AuthState>((set) => {
  // TODO: 새로고침 시에도 로그인 유지
  // const storedUser = localStorage.getItem('user')
  // const storedUserProfile = localStorage.getItem('userProfile')
  // const storedIsAuthenticated = localStorage.getItem('isAuthenticated')
  return {
    user: null,
    isAuthenticated: false,
    isSignUpRequired: true,
    uid: null,
    userProfile: null,
    setUser: (user: User | null) => set({ user }),
    setIsAuthenticated: (isAuthenticated) => set({ isAuthenticated }),
    setIsSignUpRequired: (isSignUpRequired) => set({ isSignUpRequired }),
    setUid: (uid) => set({ uid }),
    setUserProfile: (userProfile: UserProfile | null) => set({ userProfile }),
  }
})

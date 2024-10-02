import type { User } from 'firebase/auth'
import type { UserProfile } from '../types/user/UserTypes.ts'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

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

const loadStoredData = () => {
  const storedUser = localStorage.getItem('user')
  const storedIsAuthenticated = localStorage.getItem('isAuthenticated')
  const storedUserProfile = localStorage.getItem('userProfile')
  const storedIsSignUpRequired = localStorage.getItem('isSignUpRequired')

  return {
    user: storedUser ? JSON.parse(storedUser) : null,
    isAuthenticated: storedIsAuthenticated === 'true',
    userProfile: storedUserProfile ? JSON.parse(storedUserProfile) : null,
    isSignUpRequired: storedIsSignUpRequired === 'true',
  }
}

const initialState = loadStoredData()

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      ...initialState,
      uid: null,
      setUser: (user: User | null) => {
        set({ user })
        localStorage.setItem('user', JSON.stringify(user))
      },
      setIsAuthenticated: (isAuthenticated) => {
        set({ isAuthenticated })
        localStorage.setItem('isAuthenticated', JSON.stringify(isAuthenticated))
      },
      setIsSignUpRequired: (isSignUpRequired) => set({ isSignUpRequired }),
      setUid: (uid) => set({ uid }),
      setUserProfile: (userProfile: UserProfile | null) => {
        set({ userProfile })
        localStorage.setItem('userProfile', JSON.stringify(userProfile))
      },
    }),
    {
      name: 'auth-storage',
      //TODO: 대체 메서드 찾아보기
      getStorage: () => localStorage,
    },
  ),
)

import type { User } from 'firebase/auth'
import type { UserProfile } from '../types/user/UserTypes.ts'
import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

type LocalStorageKeys = 'user' | 'isAuthenticated' | 'userProfile'

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

const USER: LocalStorageKeys = 'user'
const IS_AUTHENTICATE: LocalStorageKeys = 'isAuthenticated'
const USER_PROFILE: LocalStorageKeys = 'userProfile'

const loadStoredData = () => {
  const storedUser = localStorage.getItem('user')
  const storedIsAuthenticated = localStorage.getItem('isAuthenticated')
  const storedUserProfile = localStorage.getItem('userProfile')
  const storedIsSignUpRequired = localStorage.getItem('isSignUpRequired')
  const storedUid = localStorage.getItem('uid')

  return {
    user: storedUser ? JSON.parse(storedUser) : null,
    uid: storedUid ? JSON.parse(storedUid) : null,
    isAuthenticated: storedIsAuthenticated === 'true',
    userProfile: storedUserProfile ? JSON.parse(storedUserProfile) : null,
    isSignUpRequired: storedIsSignUpRequired === 'true',
  }
}

const initialState = loadStoredData()

const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      ...initialState,
      setUser: (user: User | null) => {
        set({ user })
        localStorage.setItem(USER, JSON.stringify(user))
      },
      setIsAuthenticated: (isAuthenticated) => {
        set({ isAuthenticated })
        localStorage.setItem(IS_AUTHENTICATE, JSON.stringify(isAuthenticated))
      },
      setIsSignUpRequired: (isSignUpRequired) => set({ isSignUpRequired }),
      setUid: (uid) => set({ uid }),
      setUserProfile: (userProfile: UserProfile | null) => {
        set({ userProfile })
        localStorage.setItem(USER_PROFILE, JSON.stringify(userProfile))
      },
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => localStorage),
    },
  ),
)

export default useAuthStore

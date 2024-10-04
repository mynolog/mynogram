import type { UserProfile } from '../types/user/userTypes.ts'
import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

type LocalStorageKeys = 'user' | 'isAuthenticated' | 'userProfile'

type AuthState = {
  isAuthenticated: boolean
  setIsAuthenticated: (isAuthenticated: boolean) => void
  isSignUpRequired: boolean
  setIsSignUpRequired: (isSignUpRequired: boolean) => void
  uid: string | null
  setUid: (uid: string | null) => void
  userProfile: UserProfile | null
  setUserProfile: (userProfile: UserProfile | null) => void
  avatarUrl: string | null
  setAvatarUrl: (avatarUrl: string | null) => void
}

const IS_AUTHENTICATE: LocalStorageKeys = 'isAuthenticated'
const USER_PROFILE: LocalStorageKeys = 'userProfile'

const loadStoredData = () => {
  const storedIsAuthenticated = localStorage.getItem('isAuthenticated')
  const storedUserProfile = localStorage.getItem('userProfile')
  const storedIsSignUpRequired = localStorage.getItem('isSignUpRequired')
  const storedUid = localStorage.getItem('uid')

  return {
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
      avatarUrl: null,
      setAvatarUrl: (avatarUrl: string | null) => set({ avatarUrl }),
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

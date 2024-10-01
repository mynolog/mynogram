import type { SignUpForm } from '../types/auth/authTypes.ts'
import { auth, db } from '../config/firebaseConfig.ts'
import { GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth'
import { doc, setDoc } from 'firebase/firestore'

export const firebaseAuthService = {
  async googleLogin() {
    try {
      const googleAuthProvider = new GoogleAuthProvider()
      const result = await signInWithPopup(auth, googleAuthProvider)
      return result.user
    } catch (error) {
      console.error('googleLogin', error)
      return null
    }
  },

  async logout() {
    await signOut(auth)
  },

  async signUp(uid: string, targetForm: SignUpForm) {
    try {
      const userDocRef = doc(db, 'user', uid)
      await setDoc(userDocRef, targetForm)
      return true
    } catch (error) {
      console.error('회원가입 실패', error)
    }
    return false
  },
}

import type { SignUpForm } from '../types/auth/authTypes.ts'
import { auth, db } from '../config/firebaseConfig.ts'
import {
  GoogleAuthProvider,
  GithubAuthProvider,
  signInWithPopup,
  signOut,
} from 'firebase/auth'
import { doc, setDoc } from 'firebase/firestore'
import { Collection } from '../types/firebase/firebaseTypes.ts'

const USER: Collection = 'user'

export const firebaseAuthService = {
  async googleLogin() {
    try {
      const googleAuthProvider = new GoogleAuthProvider()
      const result = await signInWithPopup(auth, googleAuthProvider)
      return result.user
    } catch (error) {
      console.error('로그인 실패', error)
      return null
    }
  },

  async githubLogin() {
    try {
      const githubAuthProvider = new GithubAuthProvider()
      const result = await signInWithPopup(auth, githubAuthProvider)
      return result.user
    } catch (error) {
      console.error('로그인 실패', error)
      return null
    }
  },

  async logout() {
    await signOut(auth)
  },

  async signUp(uid: string, targetForm: SignUpForm) {
    try {
      const userDocRef = doc(db, USER, uid)
      await setDoc(userDocRef, targetForm)
      return true
    } catch (error) {
      console.error('회원가입 실패', error)
    }
    return false
  },
}

import { auth } from '../config/firebaseConfig.ts'
import { GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth'

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
}

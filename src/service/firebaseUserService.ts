import { UserProfile } from '../types/auth/UserProfile.ts'
import { db } from '../config/firebaseConfig.ts'
import { doc, getDoc } from 'firebase/firestore'

export const firebaseUserService = {
  async getUserByUid(uid: string): Promise<UserProfile | null> {
    try {
      const userDocRef = doc(db, 'user', uid)
      const userDoc = await getDoc(userDocRef)
      if (userDoc.exists()) {
        return userDoc.data() as UserProfile
      } else {
        console.error('유저가 존재하지 않습니다.')
      }
    } catch (error) {
      console.error('유저 조회 실패', error)
    }
    return null
  },
}

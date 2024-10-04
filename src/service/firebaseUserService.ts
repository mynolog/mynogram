import type { Collection } from '../types/firebase/firebaseTypes.ts'
import { UserProfile } from '../types/user/UserTypes.ts'
import { db } from '../config/firebaseConfig.ts'
import { doc, getDoc, updateDoc } from 'firebase/firestore'

const USER: Collection = 'user'

export const firebaseUserService = {
  async getUserByUid(uid: string): Promise<UserProfile | null> {
    try {
      const userDocRef = doc(db, USER, uid)
      const userDoc = await getDoc(userDocRef)
      if (userDoc.exists()) {
        return userDoc.data() as UserProfile
      } else {
        console.error('회원 정보가 존재하지 않습니다.')
        return null
      }
    } catch (error) {
      console.error('유저 조회 실패', error)
    }
    return null
  },

  async updateUserProfileByUid(
    uid: string,
    // TODO: 타입 별칭으로 분리
    targetUserForm: {
      id: string
      name: string
      description: string
    },
  ) {
    try {
      const userDocRef = doc(db, USER, uid)

      if (userDocRef) {
        await updateDoc(userDocRef, {
          ...targetUserForm,
        })
        const userDoc = await getDoc(userDocRef)
        if (userDoc.exists()) {
          return userDoc.data() as UserProfile
        }
      } else {
        console.error('회원 정보가 존재하지 않습니다.')
        return null
      }
    } catch (error) {
      console.error('유저 정보 수정 실패', error)
    }
    return null
  },
}

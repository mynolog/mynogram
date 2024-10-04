import type { Collection } from '../types/firebase/firebaseTypes.ts'
import { UserProfile } from '../types/user/userTypes.ts'
import { db, storage } from '../config/firebaseConfig.ts'
import { doc, getDoc, updateDoc } from 'firebase/firestore'
import { getDownloadURL, uploadBytes, ref } from 'firebase/storage'

const USER: Collection = 'user'

export const firebaseUserService = {
  async getUserByUid(uid: string): Promise<UserProfile | null> {
    try {
      const userDocRef = doc(db, USER, uid)
      const userDoc = await getDoc(userDocRef)
      if (userDoc.exists()) {
        return userDoc.data() as UserProfile
      } else {
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
    targetFile: File,
  ) {
    try {
      const storageRef = ref(storage, `users/${targetFile.name}`)
      const uploadResult = await uploadBytes(storageRef, targetFile)
      const fileUrl = await getDownloadURL(uploadResult.ref)

      const userDocRef = doc(db, USER, uid)

      if (userDocRef) {
        await updateDoc(userDocRef, {
          ...targetUserForm,
          avatarUrl: fileUrl,
        })
        const userDoc = await getDoc(userDocRef)
        if (userDoc.exists()) {
          return userDoc.data() as UserProfile
        }
      } else {
        return null
      }
    } catch (error) {
      console.error('유저 정보 수정 실패', error)
    }
    return null
  },
}

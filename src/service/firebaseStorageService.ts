import type { Post } from '../types/post/PostTypes.ts'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import { db, storage } from '../config/firebaseConfig.ts'
import {
  addDoc,
  collection,
  doc,
  getDoc,
  onSnapshot,
  orderBy,
  query,
  setDoc,
  where,
} from 'firebase/firestore'
import { UserProfile } from '../types/user/UserTypes.ts'
import { Collection } from '../types/firebase/firebaseTypes.ts'

const POSTS: Collection = 'posts'
const USER: Collection = 'user'

export const firebaseStorageService = {
  async uploadFile(targetFile: File, targetPost: Post) {
    try {
      const storageRef = ref(storage, `posts/${targetFile.name}`)
      const uploadResult = await uploadBytes(storageRef, targetFile)
      const fileUrl = await getDownloadURL(uploadResult.ref)
      const collectionRef = collection(db, POSTS)
      await addDoc(collectionRef, {
        ...targetPost,
        url: fileUrl,
      })
      return true
    } catch (e) {
      console.error(e)
    }
    return false
  },

  async findPosts(callback: (data: Post[]) => void) {
    try {
      const collectionRef = collection(db, POSTS)
      const q = query(collectionRef, orderBy('createdAt', 'desc'))
      return onSnapshot(q, (snapshot) => {
        const data = snapshot.docs.map((doc) => ({
          ...(doc.data() as Post),
          id: doc.id,
        }))
        callback(data)
      })
    } catch (e) {
      console.error(e)
    }
    return null
  },

  async findPostsByUid(
    uid: string,
    callback: (userProfile: UserProfile | null) => void,
  ) {
    try {
      const collectionRef = collection(db, POSTS)
      const q = query(collectionRef, where('uid', '==', uid))

      return onSnapshot(q, async (querySnapshot) => {
        const userPosts = querySnapshot.docs.map((doc) => ({
          ...(doc.data() as Post),
          id: doc.id,
        }))

        const docRef = doc(db, USER, uid)
        const userDoc = await getDoc(docRef)

        if (userDoc.exists()) {
          await setDoc(
            docRef,
            {
              posts: userPosts.length,
            },
            { merge: true },
          )
          const newUserProfile: UserProfile = {
            ...(userDoc.data() as UserProfile),
            posts: userPosts.length,
          }
          callback(newUserProfile)
        } else {
          callback(null)
        }
      })
    } catch (e) {
      console.error(e)
      callback(null)
    }
  },
}

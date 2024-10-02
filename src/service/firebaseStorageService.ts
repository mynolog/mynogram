import type { Post } from '../types/post/PostTypes.ts'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { db, storage } from '../config/firebaseConfig.ts'
import {
  collection,
  addDoc,
  orderBy,
  query,
  onSnapshot,
} from 'firebase/firestore'

const COLLECTION_NAME = 'posts'

export const firebaseStorageService = {
  async uploadFile(targetFile: File, targetPost: Post) {
    try {
      const storageRef = ref(storage, `posts/${targetFile.name}`)
      const uploadResult = await uploadBytes(storageRef, targetFile)
      const fileUrl = await getDownloadURL(uploadResult.ref)
      const collectionRef = collection(db, COLLECTION_NAME)
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
      const collectionRef = collection(db, COLLECTION_NAME)
      const q = query(collectionRef, orderBy('uid', 'desc'))
      return onSnapshot(q, (snapshot) => {
        const data = snapshot.docs.map((doc) => ({
          ...(doc.data() as Post),
        }))
        callback(data)
      })
    } catch (e) {
      console.error(e)
    }
    return null
  },
}

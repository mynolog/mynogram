import type { Post } from '../types/post/PostTypes.ts'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { db, storage } from '../config/firebaseConfig.ts'
import { collection, addDoc } from 'firebase/firestore'

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
}

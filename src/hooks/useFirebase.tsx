import { doc, getDoc } from 'firebase/firestore'
import { db } from '../config/firebaseConfig.ts'

const useFirebase = () => {
  const checkUserExists = async (uid: string) => {
    const docRef = doc(db, 'user', uid)

    try {
      const snapshot = await getDoc(docRef)
      return snapshot.exists()
    } catch (e) {
      console.error('유저 없음', e)
      return false
    }
  }
  return { checkUserExists }
}

export default useFirebase

import { useEffect } from 'react'
import useAuthStore from '../store/authStore.ts'

export const useTitle = () => {
  const { userProfile } = useAuthStore()

  useEffect(() => {
    if (userProfile) {
      document.title = `${userProfile.id} • Mynogram`
    } else {
      document.title = `Mynogram`
    }
  }, [userProfile])
  return null
}

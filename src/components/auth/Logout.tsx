import { useAuthStore } from '../../store/authStore.ts'
import { firebaseAuthService } from '../../service/firebaseAuthService.ts'
import CommonButton from '../common/button/CommonButton.tsx'
import useToastStore from '../../store/toastStore.ts'

const Logout = () => {
  const addToast = useToastStore((state) => state.addToast)
  const { setUser, setIsAuthenticated } = useAuthStore()
  const handleLogoutClick = async () => {
    try {
      await firebaseAuthService.logout()
      setUser(null)
      setIsAuthenticated(false)
      addToast('✅ 로그아웃 완료: 다시 만나요!', 'update')
    } catch (error) {
      console.error('로그아웃 실패', error)
      addToast('🚫 로그아웃 실패: 다시 시도해 주세요.', 'warning')
    }
  }
  return (
    <CommonButton width="90%" fontSize="0.85rem" onClick={handleLogoutClick}>
      로그아웃
    </CommonButton>
  )
}

export default Logout

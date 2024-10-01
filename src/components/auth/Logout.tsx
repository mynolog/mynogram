import { useAuthStore } from '../../store/authStore.ts'
import { firebaseAuthService } from '../../service/firebaseAuthService.ts'
import CommonButton from '../common/button/CommonButton.tsx'

const Logout = () => {
  const { setUser, setIsAuthenticated } = useAuthStore()
  const handleLogoutClick = async () => {
    await firebaseAuthService.logout()
    setUser(null)
    setIsAuthenticated(false)
  }
  return (
    <CommonButton width="90%" fontSize="0.85rem" onClick={handleLogoutClick}>
      로그아웃
    </CommonButton>
  )
}

export default Logout

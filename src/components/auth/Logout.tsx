import { useAuthStore } from '../../store/authStroe.ts'
import { firebaseAuthService } from '../../service/firebaseAuthService.ts'

const Logout = () => {
  const { setUser, setIsAuthenticated } = useAuthStore()
  const handleLogout = async () => {
    await firebaseAuthService.logout()
    setUser(null)
    setIsAuthenticated(false)
  }
  return (
    <button
      className="absolute bottom-2 left-2 w-11/12 bg-gray-900 text-white p-3 rounded-xl flex items-center justify-center gap-3"
      onClick={handleLogout}
    >
      로그아웃
    </button>
  )
}

export default Logout

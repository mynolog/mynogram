import { firebaseAuthService } from '../../service/firebaseAuthService.ts'
import { useAuthStore } from '../../store/authStroe.ts'

const Home = () => {
  const { user, setUser, setIsAuthenticated } = useAuthStore()
  const handleLogout = async () => {
    await firebaseAuthService.logout()
    setUser(null)
    setIsAuthenticated(false)
  }
  return (
    <div>
      {user && (
        <>
          <h2>{user.email}</h2>
          <button onClick={handleLogout}>로그아웃</button>
        </>
      )}
    </div>
  )
}

export default Home

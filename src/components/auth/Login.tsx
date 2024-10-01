import { useAuthStore } from '../../store/authStroe.ts'
import { useNavigate } from 'react-router-dom'
import { firebaseAuthService } from '../../service/firebaseAuthService.ts'

const Login = () => {
  const { setIsAuthenticated, setUser } = useAuthStore()
  const navigate = useNavigate()

  const handleLogin = async () => {
    const loginUser = await firebaseAuthService.googleLogin()
    setUser(loginUser)
    setIsAuthenticated(true)
    navigate('/')
  }

  return (
    <div>
      <h2>로그인</h2>
      <button
        className="bg-gray-900 text-white p-3 rounded-xl"
        onClick={handleLogin}
      >
        로그인
      </button>
    </div>
  )
}

export default Login

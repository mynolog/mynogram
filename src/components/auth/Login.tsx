import { useAuthStore } from '../../store/authStroe.ts'
import { Navigate, useNavigate } from 'react-router-dom'
import { firebaseAuthService } from '../../service/firebaseAuthService.ts'
import { FaGoogle } from 'react-icons/fa'
import Logo from '../common/logo/Logo.tsx'

const Login = () => {
  const { setIsAuthenticated, setUser, isAuthenticated } = useAuthStore()
  const navigate = useNavigate()

  const handleLogin = async () => {
    const loginUser = await firebaseAuthService.googleLogin()
    setUser(loginUser)
    setIsAuthenticated(true)
    navigate('/')
  }

  if (isAuthenticated) {
    return <Navigate to={'/'} />
  }

  return (
    <div className="w-full h-screen flex flex-col items-center justify-center gap-6">
      <Logo />
      <button
        className="w-1/6 bg-gray-900 text-white p-3 rounded-xl flex items-center justify-center gap-3"
        onClick={handleLogin}
      >
        <FaGoogle />
        <span>로그인</span>
      </button>
    </div>
  )
}

export default Login

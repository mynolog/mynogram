import { useAuthStore } from '../../store/authStroe.ts'
import { Navigate, useNavigate } from 'react-router-dom'
import { firebaseAuthService } from '../../service/firebaseAuthService.ts'
import { FaGoogle } from 'react-icons/fa'
import Logo from '../common/logo/Logo.tsx'
import CommonButton from '../common/button/CommonButton.tsx'

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
      <CommonButton width="16.7%" gap="1.25rem" onClick={handleLogin}>
        <FaGoogle />
        <span>로그인</span>
      </CommonButton>
    </div>
  )
}

export default Login

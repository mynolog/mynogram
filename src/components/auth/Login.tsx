import { useAuthStore } from '../../store/authStore.ts'
import { Navigate, useNavigate } from 'react-router-dom'
import { firebaseAuthService } from '../../service/firebaseAuthService.ts'
import { FaGoogle } from 'react-icons/fa'
import Logo from '../common/logo/Logo.tsx'
import CommonButton from '../common/button/CommonButton.tsx'
import useFirebase from '../../hooks/useFirebase.tsx'
import useToastStore from '../../store/toastStore.ts'

const Login = () => {
  const addToast = useToastStore((state) => state.addToast)
  const {
    setIsAuthenticated,
    setUser,
    isAuthenticated,
    needSignUp,
    setNeedSignUp,
    setUid,
  } = useAuthStore()
  const { checkUserExists } = useFirebase()
  const navigate = useNavigate()

  const handleLoginClick = async () => {
    setNeedSignUp(true)
    try {
      const loginUser = await firebaseAuthService.googleLogin()
      if (loginUser) {
        const isRegistered = await checkUserExists(loginUser.uid)
        if (!isRegistered) {
          addToast('⚠️ 비회원: 회원가입 페이지로 이동합니다.', 'update')
          setUid(loginUser.uid)
          navigate('/signup')
          return
        }
      }
      addToast('✅ 로그인 성공: 환영합니다!', 'success')
      setUser(loginUser)
      setIsAuthenticated(true)
      setNeedSignUp(false)
      // navigate('/')
    } catch (error) {
      console.log('로그인 실패', error)
      addToast('🚫 로그인 실패: 관리자에게 문의해주세요.', 'warning')
    }
  }

  if (!needSignUp && isAuthenticated) {
    return <Navigate to={'/'} />
  }

  return (
    <div className="w-full h-screen flex flex-col items-center justify-center gap-6">
      <Logo />
      <CommonButton width="16.7%" gap="1.25rem" onClick={handleLoginClick}>
        <FaGoogle />
        <span>로그인</span>
      </CommonButton>
    </div>
  )
}

export default Login

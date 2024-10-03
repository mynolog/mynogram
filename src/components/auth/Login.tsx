import useAuthStore from '../../store/authStore.ts'
import { Navigate, useNavigate } from 'react-router-dom'
import { firebaseAuthService } from '../../service/firebaseAuthService.ts'
import { FaGoogle } from 'react-icons/fa'
import { FaGithub } from 'react-icons/fa6'
import Logo from '../common/logo/Logo.tsx'
import CommonButton from '../common/button/CommonButton.tsx'
import useToastStore from '../../store/toastStore.ts'
import { firebaseUserService } from '../../service/firebaseUserService.ts'

const Login = () => {
  const addToast = useToastStore((state) => state.addToast)
  const {
    isAuthenticated,
    isSignUpRequired,
    setIsAuthenticated,
    setIsSignUpRequired,
    setUid,
    setUserProfile,
    setAvatarUrl,
  } = useAuthStore()
  const navigate = useNavigate()

  const handleLoginClick = async (provider: 'google' | 'github') => {
    setIsSignUpRequired(true)
    setIsAuthenticated(false)
    setUserProfile(null)
    setUid(null)
    setAvatarUrl(null)

    const authProviders = {
      google: firebaseAuthService.googleLogin,
      github: firebaseAuthService.githubLogin,
    }

    try {
      const loginUser = await authProviders[provider]()
      if (loginUser) {
        setAvatarUrl(loginUser.photoURL)
        setUid(loginUser.uid)
        const loginUserProfile = await firebaseUserService.getUserByUid(
          loginUser.uid,
        )
        // 유저 정보 없으면: 비회원 -> 회원가입 페이지로 이동
        if (!loginUserProfile) {
          navigate('/signup')
          addToast('⚠️ 비회원: 회원가입 페이지로 이동합니다.', 'update')
          // 나머지 회원 인증 관련 상태처리는 SignUp에서 담당
          return
        }
        // 유저 정보 있으면: 회원 -> 회원 인증 관련 상태 처리 후 홈으로 이동
        // setUser(loginUser)
        setUserProfile(loginUserProfile)
        setIsSignUpRequired(false)
        setUid(loginUser.uid)
        setIsAuthenticated(true)
        addToast('🔓 로그인 성공: 환영합니다!', 'success')
      }
    } catch (error) {
      console.log('로그인 실패', error)
      addToast('🚫 로그인 실패: 관리자에게 문의해주세요.', 'warning')
    }
  }

  if (!isSignUpRequired && isAuthenticated) {
    return <Navigate to={'/'} />
  }

  return (
    <div className="w-full h-screen flex flex-col items-center justify-center gap-6">
      <Logo />
      <CommonButton
        width="16.7%"
        gap="1.25rem"
        onClick={() => handleLoginClick('google')}
      >
        <FaGoogle />
        <span>로그인</span>
      </CommonButton>
      <CommonButton
        width="16.7%"
        gap="1.25rem"
        onClick={() => handleLoginClick('github')}
      >
        <FaGithub />
        <span>로그인</span>
      </CommonButton>
    </div>
  )
}

export default Login

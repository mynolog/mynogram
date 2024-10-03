import useAuthStore from '../../store/authStore.ts'
import { Navigate, useNavigate } from 'react-router-dom'
import { firebaseAuthService } from '../../service/firebaseAuthService.ts'
import { FaGoogle } from 'react-icons/fa'
import { FaGithub } from 'react-icons/fa6'
import Logo from '../common/logo/Logo.tsx'
import CommonButton from '../common/button/CommonButton.tsx'
import useFirebase from '../../hooks/useFirebase.tsx'
import useToastStore from '../../store/toastStore.ts'
import { firebaseUserService } from '../../service/firebaseUserService.ts'

const Login = () => {
  const addToast = useToastStore((state) => state.addToast)
  const {
    isAuthenticated,
    isSignUpRequired,
    setUser,
    setIsAuthenticated,
    setIsSignUpRequired,
    setUid,
    setUserProfile,
  } = useAuthStore()
  const { checkUserExists } = useFirebase()
  const navigate = useNavigate()

  const handleLoginClick = async (provider: 'google' | 'github') => {
    setIsSignUpRequired(true)

    const authProviders = {
      google: firebaseAuthService.googleLogin,
      github: firebaseAuthService.githubLogin,
    }

    try {
      const loginUser = await authProviders[provider]()
      if (loginUser) {
        const loginUserProfile = await firebaseUserService.getUserByUid(
          loginUser.uid,
        )
        if (loginUserProfile) {
          setUserProfile(loginUserProfile)
        }
        const isRegistered = await checkUserExists(loginUser.uid)

        if (!isRegistered) {
          navigate('/signup')
          addToast('⚠️ 비회원: 회원가입 페이지로 이동합니다.', 'update')
        } else {
          setIsSignUpRequired(false)
        }
        addToast('🔓 로그인 성공: 환영합니다!', 'success')
        setUser(loginUser)
        setUid(loginUser.uid)
        setIsAuthenticated(true)
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

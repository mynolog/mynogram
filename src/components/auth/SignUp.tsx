import type { MouseEvent } from 'react'
import CommonButton from '../common/button/CommonButton.tsx'
import useAuthStore from '../../store/authStore.ts'
import Logo from '../common/logo/Logo.tsx'
import CommonInput from '../common/input/CommonInput.tsx'
import useForm from '../../hooks/useForm'
import { firebaseAuthService } from '../../service/firebaseAuthService.ts'
import { useNavigate } from 'react-router-dom'
import useToastStore from '../../store/toastStore.ts'

const SignUp = () => {
  const addToast = useToastStore((state) => state.addToast)
  const { uid, setIsSignUpRequired, setIsAuthenticated, user } = useAuthStore()
  const navigate = useNavigate()
  const { form, handleFormChange, resetForm } = useForm({
    id: '',
    name: '',
    description: '',
  })

  const handleSignUpSubmit = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()

    if (form.id.trim() === '') {
      addToast('아이디는 필수입니다.', 'delete')
      return
    }
    if (form.name.trim() === '') {
      addToast('이름은 필수입니다.', 'delete')
      return
    }
    try {
      const newUserForm = {
        ...form,
        posts: 0,
        followers: 0,
        follows: 0,
        avatarUrl: user?.photoURL || null,
      }
      if (!uid) {
        resetForm()
        navigate('/login')
        return
      }
      const result = await firebaseAuthService.signUp(uid, newUserForm)
      if (!result) {
        return
      }

      setIsSignUpRequired(false)
      setIsAuthenticated(true)
      navigate('/')
      addToast('✅ 회원가입 완료: 홈으로 이동합니다.', 'update')
    } catch (e) {
      console.error('회원가입 실패: 다시 시도해주세요.', e)
      addToast('회원가입 실패: 다시 시도해주세요.', 'delete')
    }
  }
  return (
    <div className="w-full h-screen flex flex-col items-center justify-center min-h-screen">
      <form className="p-5 w-1/2 h-3/4 gap-6 flex flex-col justify-center items-center shadow-2xl rounded-2xl">
        <Logo fontSize="2.25rem" />
        <h1 className="text-2xl font-semibold">회원가입</h1>
        <div className="w-full flex flex-col items-center">
          <CommonInput
            value={form.id}
            label="ID*"
            name="id"
            onChange={handleFormChange}
          />
          <CommonInput
            value={form.name}
            label="이름*"
            name="name"
            onChange={handleFormChange}
          />
          <CommonInput
            value={form.description}
            label="한 줄 소개"
            name="description"
            onChange={handleFormChange}
          />
        </div>
        <CommonButton
          type="submit"
          width="50%"
          fontSize="1rem"
          onClick={handleSignUpSubmit}
        >
          가입하기
        </CommonButton>
      </form>
    </div>
  )
}

export default SignUp

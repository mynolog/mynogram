import type { MouseEvent } from 'react'
import CommonButton from '../common/button/CommonButton.tsx'
import { useAuthStore } from '../../store/authStore.ts'
import Logo from '../common/logo/Logo.tsx'
import CommonInput from '../common/input/CommonInput.tsx'
import useForm from '../../hooks/useForm'
import { firebaseAuthService } from '../../service/firebaseAuthService.ts'
import { useNavigate } from 'react-router-dom'

const SignUp = () => {
  const { uid, setNeedSignUp, setIsAuthenticated } = useAuthStore()
  const navigate = useNavigate()
  const { form, handleFormChange, resetForm } = useForm({
    id: '',
    name: '',
    description: '',
  })

  const handleSignUpSubmit = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    const newUserForm = { ...form, posts: 0, followers: 0, follows: 0 }
    if (!uid) {
      resetForm()
      navigate('/login')
    } else {
      const result = await firebaseAuthService.signUp(uid, newUserForm)
      if (!result) {
        return
      }
      // 회원가입 완료 토스트 메시지 출력 필요
      setNeedSignUp(false)
      setIsAuthenticated(true)
      // 회원가입 완료 후 다시 로그인 필요
      navigate('/login')
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
            required={true}
            onChange={handleFormChange}
          />
          <CommonInput
            value={form.name}
            label="이름*"
            name="name"
            required={true}
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

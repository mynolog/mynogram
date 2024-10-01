import { useAuthStore } from '../../store/authStroe.ts'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const setIsAuthenticated = useAuthStore((state) => state.setIsAuthenticated)
  const navigate = useNavigate()

  const handleLogin = () => {
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

import type { ReactNode } from 'react'
import { Navigate } from 'react-router-dom'
import useAuthStore from '../../store/authStore.ts'

type PublicOnlyRouteProps = {
  children: ReactNode
}

const PublicOnlyRoute = ({ children }: PublicOnlyRouteProps) => {
  const { isAuthenticated } = useAuthStore()
  return !isAuthenticated ? <>{children}</> : <Navigate to={'/'} />
}

export default PublicOnlyRoute

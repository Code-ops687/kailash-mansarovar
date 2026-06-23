import { useAuthStore } from '@/store/authStore'
import { ReactNode } from 'react'
import { Navigate } from 'react-router-dom'

interface ProtectedRouteProps {
  children: ReactNode
  requiredRole?: string[]
}

export default function ProtectedRoute({ children, requiredRole = ['ADMIN'] }: ProtectedRouteProps) {
  const { user, isAuthenticated } = useAuthStore()

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  if (requiredRole && user && !requiredRole.includes(user.role)) {
    return <Navigate to="/" replace />
  }

  return children
}

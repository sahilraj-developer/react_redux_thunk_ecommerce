import type { ReactNode } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useAppSelector } from '../store/hooks'
import type { UserRole } from '../features/auth/authSlice'

const roleLabel: Record<UserRole, string> = {
  guest: 'Guest',
  customer: 'Customer',
  admin: 'Admin',
  vendor: 'Vendor',
}

type ProtectedRouteProps = {
  children: ReactNode
  allow?: UserRole[]
}

const ProtectedRoute = ({ children, allow = ['customer', 'admin'] }: ProtectedRouteProps) => {
  const user = useAppSelector((state) => state.auth.user)
  const location = useLocation()

  if (!user) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />
  }

  if (!allow.includes(user.role)) {
    return (
      <Navigate
        to="/"
        replace
        state={{ notice: `Access restricted to ${allow.map((role) => roleLabel[role]).join(' or ')}` }}
      />
    )
  }

  return children
}

export default ProtectedRoute


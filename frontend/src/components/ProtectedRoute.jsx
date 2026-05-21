import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

function ProtectedRoute({ children, fallback = null }) {
  const { isAuthenticated } = useAuth()
  const location = useLocation()

  if (!isAuthenticated) {
    if (fallback) return fallback

    return <Navigate to="/" replace state={{ authRequired: true, from: location.pathname }} />
  }

  return children
}

export default ProtectedRoute

import { Navigate } from 'react-router-dom'
// components
import Loader from './Loader'
// context
import { useUser } from 'context/UserContext'

export function ProtectedRoute ({ children }) {
  const { user, loading } = useUser()

  if (loading) return <Loader />

  if (!user.isLogged) return <Navigate to='/' />

  if (user.rol !== 'admin') return <Navigate to='/' />


  return <>{children}</>
}

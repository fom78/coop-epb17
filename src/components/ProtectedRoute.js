import { Navigate } from 'react-router-dom'
// components
import Loader from './Loader'
// context
import { useUser } from 'context/UserContext'

export function ProtectedRoute ({ children, rolConAcceso = 'user' }) {
  const { user, loading } = useUser()

  if (loading) return <Loader />

  if (!user.isLogged) return <Navigate to='/' />

  /* Ver roles ejemplo
  user
  mod
  admin 
  */

  if (rolConAcceso === 'user') return <>{children}</>

  if (rolConAcceso === 'mod' && (user.rol === 'mod' || user.rol === 'admin') ) return <>{children}</>

  if (rolConAcceso === 'admin' &&  user.rol === 'admin' ) return <>{children}</>

  if (user.rol !== 'admin') return <Navigate to='/' />


  return <>{children}</>
}

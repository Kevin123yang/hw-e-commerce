import { useContext } from 'react'
import { AuthContext } from '../features/auth/pages/context/AuthContext'
import { Navigate } from 'react-router-dom'

export default function ProtectedRoute({children}: {children: React.ReactNode}) {
    const auth = useContext(AuthContext)
    
    if(!auth) throw new Error("AuthContext not found")
    const {user} = auth
    if(!user){
        return <Navigate to="/login" replace />;
    }
  return children
}

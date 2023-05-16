import { Navigate, Outlet } from 'react-router-dom'
import { useAppSelector } from '../../redux/hooks'
import { selectUser } from '../../redux/features/userSlice'
import RedirectProps from './interface'

export default function ProtectedRoute({ redirectPath = '/signin' }: RedirectProps) {
  const { isAuth } = useAppSelector(selectUser)

  if (!isAuth) {
    return <Navigate to={redirectPath} replace />
  }

  return <Outlet />
}

import React, { useEffect } from 'react'
import Header from './components/header'
import AppRoutes from './routes'
import { useAppDispatch } from './redux/hooks'
import { setUser } from './redux/features/userSlice'
import { useCheckQuery } from './redux/services/userApi'

const App = () => {
  const dispatch = useAppDispatch()

  const user = JSON.parse(localStorage.getItem('user') || '{}')

  const { data, isSuccess } = useCheckQuery()

  useEffect(() => {
    if (user?.token) {
      if (isSuccess) {
        dispatch(setUser({ name: user.name, token: data.token, id: user.id, isAuth: true }))
      } else {
        dispatch(setUser({ ...user, isAuth: true }))
      }
    }
  }, [])

  return (
    <>
      <Header />
      <AppRoutes />
    </>
  )
}

export default App

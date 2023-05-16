import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { CARDLIST_ROUTE, SIGNIN_ROUTE, FORM_ROUTE, SIGNUP_ROUTE } from './utils/consts'
import CardList from './pages/card-list'
import Form from './pages/form'
import ProtectedRoute from './components/protected-route'
import Auth from './pages/auth'
import NotFound from './pages/not-found'

function AppRoutes() {
  return (
    <Routes>
      <Route path={SIGNUP_ROUTE} element={<Auth />} />
      <Route path={SIGNIN_ROUTE} element={<Auth />} />

      <Route element={<ProtectedRoute />}>
        <Route path={CARDLIST_ROUTE} element={<CardList />} />
        <Route path={FORM_ROUTE} element={<Form />} />
      </Route>

      <Route path='*' element={<NotFound />} />
    </Routes>
  )
}

export default AppRoutes

import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { CARDLIST_ROUTE, FORM_ROUTE } from '../../utils/consts'

const Header = () => {
  const { pathname } = useLocation()

  return (
    <header className='border-b py-2 mb-3'>
      <div className='flex justify-evenly'>
        <Link
          to={CARDLIST_ROUTE}
          className={pathname === CARDLIST_ROUTE ? 'link-custom' : 'text-black'}
        >
          Карточки
        </Link>
        <Link to={FORM_ROUTE} className={pathname === FORM_ROUTE ? 'link-custom' : 'text-black'}>
          Форма
        </Link>
      </div>
    </header>
  )
}

export default Header

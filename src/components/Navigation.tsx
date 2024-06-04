import React from 'react'
import './Navigation.scss'
import { Link } from 'react-router-dom'
import { BIN_ROUTE, PRODUSTS_ROUTE, PROFILE_ROUTE } from '../utils/const'
import logo from '../assets/logo.svg'
const Navigation = () => {
  return (
    <nav>
      <div><img src={logo} alt="" /></div>
      <ul>
        <li>
          <Link to={PRODUSTS_ROUTE}>Продукты</Link>
        </li>
        <li>
          <Link to={PROFILE_ROUTE}>Профиль</Link>
        </li>
        <li>
          <Link to={BIN_ROUTE}>Корзина</Link>
        </li>
        <li>
          <button type="button">Выйти</button>
        </li>
      </ul>
    </nav>
  )
}

export default Navigation
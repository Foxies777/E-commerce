import './Navigation.scss'
import { Link, useNavigate } from 'react-router-dom'
import { CART_ROUTE, PRODUSTS_ROUTE, PROFILE_ROUTE } from '../utils/const'
import logo from '../assets/logo.svg'
import { logout } from '../shared/auth'
const Navigation = () => {
  const navigate = useNavigate()
  const logoutHandler = () => {
    logout()
    navigate('/')
  }

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
          <Link to={CART_ROUTE}>Корзина</Link>
        </li>
        <li>
          <button type="button" onClick={logoutHandler}>Выйти</button>
        </li>
      </ul>
    </nav>
  )
}

export default Navigation
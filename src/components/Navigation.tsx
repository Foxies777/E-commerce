import './Navigation.scss'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { CART_ROUTE, PRODUSTS_ROUTE, PROFILE_ROUTE } from '../utils/const'
import logo from '../assets/logo.svg'
import { logout } from '../shared/auth'
import { useUnit } from 'effector-react'
import { useEffect } from 'react'
import { Spin } from 'antd'
import { $cart, fetchCartFx } from '../shared/cart'

const Navigation = () => {
  const [cart, loading] = useUnit([$cart, fetchCartFx.pending]);
  const location = useLocation();

  useEffect(() => {
    fetchCartFx();
  }, []);

  const navigate = useNavigate();
  const logoutHandler = () => {
    logout();
    navigate('/');
  }

  const cartCount = cart.length;

  return (
    <>
      {loading ? (
        <Spin />
      ) : (
        <nav>
          <div><img src={logo} alt="logo" /></div>
          <ul>
            <li>
              <Link to={PRODUSTS_ROUTE}>Продукты</Link>
            </li>
            <li>
              <Link to={PROFILE_ROUTE}>Профиль</Link>
            </li>
            <li style={{ position: 'relative' }}>
              <Link to={CART_ROUTE}>Корзина</Link>
              {location.pathname !== CART_ROUTE && cartCount > 0 && (
                <span>{cartCount}</span>
              )}
            </li>
            <li>
              <button type="button" onClick={logoutHandler}>Выйти</button>
            </li>
          </ul>
        </nav>
      )}
    </>
  )
}

export default Navigation

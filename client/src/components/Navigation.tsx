import './Navigation.scss'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import logo from '../assets/logo.svg'
import { $isAuth, tokenExprired } from '../shared/auth'
import { useUnit } from 'effector-react'
import { useEffect } from 'react'
import { Spin } from 'antd'
import { $cart, fetchCartFx } from '../shared/cart'
import { ERoutes } from '../utils/const'


const Navigation = () => {
  const [cart, loading] = useUnit([$cart, fetchCartFx.pending]);
  const user = useUnit($isAuth)
  const location = useLocation();

  useEffect(() => {
    fetchCartFx();
  }, []);

  const navigate = useNavigate();
  const logoutHandler = () => {
    tokenExprired();
    navigate('/');
  }
  
  const cartCount = cart.length 

  return (
    <>
      {loading ? (
        <Spin />
      ) : (
        <nav>
          <div><img src={logo} alt="logo" /></div>
          <ul>
            <li>
              <Link to={ERoutes.PRODUSTS}>Продукты</Link>
            </li>
            <li>
              <Link to={ERoutes.PROFILE}>Профиль</Link>
            </li>
            <li className='relative'>
              <Link to={ERoutes.CART}>Корзина</Link>
              {location.pathname !== ERoutes.CART && cartCount > 0 && (
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

import { useEffect } from 'react';
import { useUnit } from 'effector-react';
import Navigation from '../../../components/Navigation';
import { removeItemFx, CartItem, useCart } from '../index';
import { Spin } from 'antd';
import { $user, fetchUserFx } from '../../../shared/auth';
import '../index';

const Cart = () => {
  const [cart, loading] = useCart();
  const user = useUnit($user);
  const fetchUser = useUnit(fetchUserFx);

  useEffect(() => {
    fetchUser();
  }, []);



  const handleRemoveFromCart = (id: number, index: number) => {
    removeItemFx({ id, index });
  };

  const totalItems = cart.filter(item => item.user_id === user?.id);
  const totalPrice = totalItems.reduce((total, item) => +total + +item.price, 0);

  return (
    <>
      <Navigation />
      <div className="container mt-4">
        <h2>Корзина</h2>
        {loading ? (
          <div className='spin'>
            <Spin />
          </div>
        ) : (
          <div className="row">
            <div className="col-md-8">
              {cart.map((item, index) => (
                user && user.id === item.user_id && (
                  <CartItem
                    key={`${item.id}-${index}`}
                    {...item}
                    onRemove={() => handleRemoveFromCart(item.id, index)}
                  />
                )
              ))}
            </div>
            <div className="col-md-4">
              <div className='basket-form__sidebar'>
                <h4>К покупке</h4>
                <p>{totalItems.length} товара</p>
                <h3>Итого</h3>
                <h2>{totalPrice} руб</h2>
                <button className='button' type='button'>Оплатить</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Cart;

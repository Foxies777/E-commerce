import { useEffect } from 'react';
import { useUnit } from 'effector-react';
import Navigation from '../../components/Navigation';
import { $cart, getCartFx } from './model';
// import { useNavigate } from 'react-router-dom';
import { Spin, Button } from 'antd';
import CartItem from '../../components/CartItem';

const Cart = () => {
  const [cart, loading] = useUnit([$cart, getCartFx.pending]);
  // const navigate = useNavigate();

  useEffect(() => {
    getCartFx();
  }, []);

  // const handleRemoveFromCart = (id) => {
  //   removeFromCart(id);
  // };

  const totalItems = cart.length;
  const totalPrice = cart.reduce((total, item) => +total + +item.price, 0);

  return (
    <>
      <Navigation />
      <div className="container mt-4">

        <h2>Корзина</h2>
        {loading ? (
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <Spin />
          </div>
        ) : (
          <div className="row">
            <div className="col-md-8">
              {cart.map(item => (
                <CartItem key={item.id} {...item} />
              ))}
            </div>
            <div className="col-md-4">
              <div style={{ border: '1px solid black', padding: '10px' }}>
                <h4>К покупке</h4>
                <p>{totalItems} товара</p>
                <h3>Итого</h3>
                <h2>{totalPrice} руб</h2>
                <Button type="primary" style={{ width: '100%' }}>Оплатить</Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Cart;

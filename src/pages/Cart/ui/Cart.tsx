import { useEffect, useState } from 'react';
import { useUnit } from 'effector-react';
import Navigation from '../../../components/Navigation';
import { removeItemsFx, useCart, CartItem, removeItemFx, addItemToLocalStorageFx } from '../index';
import { Spin } from 'antd';
import { $user, fetchUserFx } from '../../../shared/auth';
import '../index';

interface CartItemType {
  id: number;
  user_id: string;
  img: string;
  title: string;
  description: string;
  price: number;
  quantity: number;
}



const CartList = () => {
  const [cart, loading] = useCart();
  const user = useUnit($user);
  const fetchUser = useUnit(fetchUserFx);
  const [groupedCart, setGroupedCart] = useState<CartItemType[]>([]);

  useEffect(() => {
    fetchUser();
  }, []);

  useEffect(() => {
    if (cart.length > 0) {
      const grouped = cart.reduce((acc: CartItemType[], item) => {
        const found = acc.find(i => i.id === item.id);
        if (found) {
          found.quantity += 1;
        } else {
          acc.push({ ...item, quantity: 1 });
        }
        return acc;
      }, []);
      setGroupedCart(grouped);
    }
  }, [cart]);

  const handleRemoveFromCart = (id: number) => {
    setGroupedCart(prev => prev.filter(item => item.id !== id));
    removeItemsFx({ id });
  };

  const handleIncreaseQuantity = (id: number) => {
    addItemToLocalStorageFx({ id, index: cart.length });
    setGroupedCart(prev => prev.map(i => i.id === id ? { ...i, quantity: i.quantity + 1 } : i));
  };

  const handleDecreaseQuantity = (id: number, index: number) => {
    setGroupedCart(prev => prev.map(item =>
      item.id === id && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item
    ));
    removeItemFx({ id, index })
  };

  const totalItems = groupedCart.filter(item => item.user_id === user?.id);
  const totalPrice = totalItems.reduce((total, item) => total + item.price * item.quantity, 0);

  if (loading) {
    return (
      <div className='spin'>
        <Spin />
      </div>
    );
  }

  return (
    <div className="row">
      <div className="col-md-8">
        {groupedCart.map((item, index) => (
          user && user.id === item.user_id && (
            <CartItem
              key={`${item.id}-${index}`}
              {...item}
              onRemove={() => handleRemoveFromCart(item.id)}
              onIncrease={() => handleIncreaseQuantity(item.id)}
              onDecrease={() => handleDecreaseQuantity(item.id, index)}
            />
          )
        ))}
      </div>
      <div className="col-md-4">
        <div style={{ border: '1px solid black', padding: '10px' }}>
          <h4>К покупке</h4>
          <p>{totalItems.length} товара</p>
          <h3>Итого</h3>
          <h2>{totalPrice} руб</h2>
          <button className='button' type='button'>Оплатить</button>
        </div>
      </div>
    </div>
  );
};

const Cart = () => {
  return (
    <>
      <Navigation />
      <div className="container mt-4">
        <h2>Корзина</h2>
        <CartList />
      </div>
    </>
  );
};

export default Cart;

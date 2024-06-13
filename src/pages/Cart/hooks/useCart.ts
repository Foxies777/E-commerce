import { useEffect } from 'react';
import { useUnit } from 'effector-react';
import { $cart, getCartFx } from '../index';

export const useCart = () => {
  const [cart, loading] = useUnit([$cart, getCartFx.pending]);

  useEffect(() => {
    getCartFx();
  }, []);

  return [cart, loading] as const;
};
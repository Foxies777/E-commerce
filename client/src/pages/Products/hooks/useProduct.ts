import { useEffect } from 'react';
import { useUnit } from 'effector-react';
import { $products, getProductsFx } from '../index';

export const useProduct = () => {
  const [products, loading] = useUnit([$products, getProductsFx.pending]);

  useEffect(() => {
    getProductsFx();
  }, []);

  return [products, loading] as const;
};
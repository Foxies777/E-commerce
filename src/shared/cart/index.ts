
import { createEffect, createEvent, createStore, sample } from 'effector';
import { persist } from 'effector-storage/local';
import { addProductToCart, getCart, removeItemFromLocalStorage } from '../api/cart';

interface Product {
  id: number;
  img: string;
  title: string;
  description: string;
  price: number;
  user_id: string;
}

export const addToCart = createEvent<Product>();
export const removeFromCart = createEvent<{ id: number; index: number }>();

export const fetchCartFx = createEffect(getCart);
export const addProductFx = createEffect(addProductToCart);
export const removeProductFx = createEffect(removeItemFromLocalStorage);

export const $cart = createStore<Product[]>([])
  .on(fetchCartFx.doneData, (_, cart) => cart)
  .on(addProductFx.doneData, (_, cart) => cart)
  .on(removeProductFx.doneData, (_, cart) => cart);

persist({
  key: 'cart',
  store: $cart,
  serialize: (cart) => JSON.stringify(cart),
  deserialize: (value) => {
    const parsed = JSON.parse(value);
    return Array.isArray(parsed) ? parsed : [];
  },
});

sample({
  source: addToCart,
  target: addProductFx,
});

sample({
  source: $cart,
  clock: addToCart,
  fn: (cart, product) => [...cart, product],
  target: $cart,
});

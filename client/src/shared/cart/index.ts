import { createEffect, createEvent, createStore, sample } from 'effector';
import { getCart, removeItemFromCart, addProductToCart, increaseProductQuantity, decreaseProductQuantity } from '../api/cart';

interface Product {
  id: number;
  img: string;
  title: string;
  description: string;
  price: number;
  user_id: number;
  count: number;
}

export const addToCart = createEvent<{ userId: number, productId: number }>();
export const removeFromCart = createEvent<number>();
export const increaseQuantity = createEvent<number>();
export const decreaseQuantity = createEvent<number>();

export const fetchCartFx = createEffect<number, Product[]>(getCart);
export const addProductFx = createEffect(addProductToCart);
export const removeProductFx = createEffect(removeItemFromCart);
export const increaseProductQuantityFx = createEffect(increaseProductQuantity);
export const decreaseProductQuantityFx = createEffect(decreaseProductQuantity);

export const $cart = createStore<Product[]>([])
  .on(fetchCartFx.doneData, (_, cart) => cart)
  .on(addProductFx.doneData, (state, product) => [...state, product])
  .on(removeProductFx.done, (state, { params }) => state.filter(item => item.id !== params))
  .on(increaseProductQuantityFx.doneData, (state, updatedProduct) => 
    state.map(item => item.id === updatedProduct.id ? updatedProduct : item)
  )
  .on(decreaseProductQuantityFx.doneData, (state, updatedProduct) =>
    state.map(item => item.id === updatedProduct.id ? updatedProduct : item)
  );

sample({
  source: addToCart,
  target: addProductFx,
});

sample({
  source: removeFromCart,
  target: removeProductFx,
});

sample({
  source: increaseQuantity,
  target: increaseProductQuantityFx,
});

sample({
  source: decreaseQuantity,
  target: decreaseProductQuantityFx,
});

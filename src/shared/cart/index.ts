import { createEvent, createStore } from 'effector';
import { persist } from 'effector-storage/local';

// Define product type
interface Product {
  id: number;
  img: string;
  title: string;
  description: string;
  price: number;
}

export const addToCart = createEvent<Product>();

const $cart = createStore<Product[]>([])
  .on(addToCart, (state, product) => [...state, product]);

persist({
  key: 'cart',
  store: $cart,
  serialize: (cart) => JSON.stringify(cart),
  deserialize: (value) => {
    const parsed = JSON.parse(value);
    return Array.isArray(parsed) ? parsed : [];
  },
});

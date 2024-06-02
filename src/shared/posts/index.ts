import { createEvent, createStore } from "effector";
import { persist } from "effector-storage/local";
import { Response } from "../api/posts/model";


// Событие для добавления продукта
export const addProduct = createEvent<Response>();

// Store для продуктов
export const $products = createStore<Response[]>([]).on(addProduct, (state, product) => [...state, product]);

// Persist store в localStorage
persist({
  key: 'products',
  store: $products,
  serialize: JSON.stringify,
  deserialize: JSON.parse,
});

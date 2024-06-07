import { createEffect, restore } from "effector";
import { getCart } from "../../shared/api/cart";


export const getCartFx = createEffect(getCart);
export const $cart = restore(getCartFx, []);

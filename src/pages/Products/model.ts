import { createEffect, restore } from "effector";
import { getProduct } from "../../shared/api/posts";


export const getProductsFx = createEffect(getProduct);
export const $products = restore(getProductsFx, []);

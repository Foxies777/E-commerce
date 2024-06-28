import { createEffect, restore, sample } from "effector";
import { getCart, removeItemFromCart, addProductToCart, increaseProductQuantity, decreaseProductQuantity } from "../../../shared/api/cart";
import { showSuccessMessageFx } from "../../../shared/notification";
import { Response } from "../../../shared/api/cart/model";

export const getCartFx = createEffect<number, Response[]>(getCart);
export const removeItemFx = createEffect<number, void>(removeItemFromCart);
export const addProductFx = createEffect<{ userId: number; productId: number }, Response>(addProductToCart);
export const increaseProductQuantityFx = createEffect<number, Response>(increaseProductQuantity);
export const decreaseProductQuantityFx = createEffect<number, Response>(decreaseProductQuantity);

export const $cart = restore(getCartFx, []);

sample({
    clock: removeItemFx.done,
    source: $cart,
    fn: (cart, { params: userId }) => userId,
    target: getCartFx,
});

sample({
    clock: addProductFx.done,
    source: $cart,
    fn: (cart, { params: { userId } }) => userId,
    target: getCartFx,
});

sample({
    clock: increaseProductQuantityFx.done,
    source: $cart,
    fn: (cart, { params: userId }) => userId,
    target: getCartFx,
});

sample({
    clock: decreaseProductQuantityFx.done,
    source: $cart,
    fn: (cart, { params: userId }) => userId,
    target: getCartFx,
});

sample({
    clock: removeItemFx.doneData,
    fn: () => 'Продукт удалён',
    target: showSuccessMessageFx,
});

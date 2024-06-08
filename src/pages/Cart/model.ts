import { createEffect, restore, sample } from "effector";
import { getCart, removeItemFromLocalStorage } from "../../shared/api/cart";
import { showSuccessMessageFx } from "../../shared/notification";


export const getCartFx = createEffect(getCart);
export const $cart = restore(getCartFx, []);

export const removeItemFx = createEffect(({ id, index }: { id: number, index: number }) => removeItemFromLocalStorage(id, index));



sample({
    clock: removeItemFx.doneData,
    target: getCartFx,
})

sample({
    clock: removeItemFx.doneData,
    fn: () => 'Продукт удалён',
    target: showSuccessMessageFx,
})

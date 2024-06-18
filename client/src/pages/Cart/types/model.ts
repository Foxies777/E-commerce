import { createEffect, restore, sample } from "effector";
import { getCart, removeItemsFromLocalStorage, removeItemFromLocalStorage, addItemToLocalStorage } from "../../../shared/api/cart";
import { showSuccessMessageFx } from "../../../shared/notification";



export const getCartFx = createEffect(getCart);
export const $cart = restore(getCartFx, []);

export const removeItemsFx = createEffect(({ id }: { id: number }) => removeItemsFromLocalStorage(id));
export const removeItemFx = createEffect(({ id, index }: { id: number, index: number }) => removeItemFromLocalStorage(id, index));
export const addItemToLocalStorageFx = createEffect(({ id, index }: { id: number, index: number }) => addItemToLocalStorage(id, index));



sample({
    clock: removeItemFx.doneData,
    target: getCartFx,
})
sample({
    clock: removeItemsFx.doneData,
    target: getCartFx,
})

sample({
    clock: addItemToLocalStorageFx.doneData,
    target: getCartFx,
});

sample({
    clock: removeItemsFx.doneData,
    fn: () => 'Продукт удалён',
    target: showSuccessMessageFx,
})

import { createEffect, sample } from "effector";
import { addProduct } from "../../shared/posts";

export const addProductFx = createEffect(addProduct)

sample({
    clock: addProductFx,
    fn: (clk) => clk.id,
    target: addProduct
})
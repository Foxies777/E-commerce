import { createEvent, createStore, createEffect } from "effector";
import { Response } from "../api/posts/model";
import { createProduct } from "../api/posts";

export const addProduct = createEvent<Response>();

export const addProductFx = createEffect(async (product: Response) => {
    const response = await createProduct(product);
    return response;
});

export const $products = createStore<Response[]>([]).on(
    addProductFx.doneData,
    (state, product) => [...state, product]
);

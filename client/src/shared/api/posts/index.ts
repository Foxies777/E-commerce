import { api, errorHandler } from "../api";
import { Response } from "./model";

export const createProduct = async (product: Response) => {
    console.log(product);
    try {
        const res = await api.post("products", {
            json: product,
            headers: {
                "Content-Type": "application/json",
            },
        });
        return res.json();
    } catch (error) {
        console.error("Ошибка при создании продукта:", error);
        return await errorHandler(error);
    }
};

export const getProduct = async () => {
    try {
        const res = await api.get("products").json<Response[]>();
        return res;
    } catch (error) {
        console.error("Error during sign-in:", error);
        return await errorHandler(error);
    }
};

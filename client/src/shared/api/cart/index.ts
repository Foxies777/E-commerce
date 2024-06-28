import { api, errorHandler } from "../api";
import { Response } from "./model";

export const getCart = async (userId: number): Promise<Response[]> => {
    console.log(userId);

    try {
        const res = await api.get(`cart/${userId}`);
        return await res.json();
    } catch (error) {
        console.error("Ошибка при получении корзины:", error);
        return await errorHandler(error);
    }
};

export const removeItemFromCart = async (id: number): Promise<void> => {
    try {
        await api.delete(`cart/${id}`);
    } catch (error) {
        console.error("Ошибка при удалении товара из корзины:", error);
        await errorHandler(error);
    }
};

export const addProductToCart = async (product: {
    userId: number;
    productId: number;
}): Promise<Response> => {
    console.log(product);

    try {
        const res = await api.post("cart", {
            json: product,
            headers: {
                "Content-Type": "application/json",
            },
        });
        return await res.json();
    } catch (error) {
        console.error("Ошибка при добавлении товара в корзину:", error);
        return await errorHandler(error);
    }
};

export const increaseProductQuantity = async (
    id: number
): Promise<Response> => {
    try {
        const res = await api.patch(`cart/increase/${id}`, {
            headers: {
                "Content-Type": "application/json",
            },
        });
        return await res.json();
    } catch (error) {
        console.error(
            "Ошибка при увеличении количества товара в корзине:",
            error
        );
        return await errorHandler(error);
    }
};

export const decreaseProductQuantity = async (
    id: number
): Promise<Response> => {
    try {
        const res = await api.patch(`cart/decrease/${id}`, {
            headers: {
                "Content-Type": "application/json",
            },
        });
        return await res.json();
    } catch (error) {
        console.error(
            "Ошибка при уменьшении количества товара в корзине:",
            error
        );
        return await errorHandler(error);
    }
};

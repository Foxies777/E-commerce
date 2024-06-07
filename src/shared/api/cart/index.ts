import { Response } from "./model";
export const getCart = async (): Promise<Response[]> => {
        const cart = localStorage.getItem('cart');
        return cart ? JSON.parse(cart) : [];
};

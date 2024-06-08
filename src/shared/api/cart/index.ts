import { Response } from "./model";

export const getCart = async (): Promise<Response[]> => {
    const cart = localStorage.getItem('cart');
    return cart ? JSON.parse(cart) : [];
};

export const removeItemFromLocalStorage = async (id: number, index: number): Promise<void> => {
    const cart = localStorage.getItem('cart');
    if (cart) {
        const parsedCart = JSON.parse(cart);
        const updatedCart = parsedCart.filter((item: Response, idx: number) => item.id !== id || idx !== index);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
    }
};

export const addProductToCart = async (product: Response) => {
    const cart = localStorage.getItem('cart');
    if (cart) {
        const parsedCart = JSON.parse(cart);
        const updatedCart = [...parsedCart, product];
        localStorage.setItem('cart', JSON.stringify(updatedCart));
        return updatedCart; 
    } else {
        const newCart = [product];
        localStorage.setItem('cart', JSON.stringify(newCart));
        return newCart;
    }
};

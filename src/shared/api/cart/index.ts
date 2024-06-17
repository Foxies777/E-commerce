import { EStorageItems, LocalStorageAPI } from "../api";
import { Response } from "./model";

export const getCart = async (): Promise<Response[]> => {
    const cart = localStorage.getItem('cart');
    return cart ? JSON.parse(cart) : [];
};

export const removeItemsFromLocalStorage = async (id: number): Promise<void> => {
    const cart = localStorage.getItem('cart');
    if (cart) {
        const parsedCart = JSON.parse(cart);
        const updatedCart = parsedCart.filter((item: Response) => item.id !== id);
        LocalStorageAPI.setItem(EStorageItems.CART, updatedCart);
        // localStorage.setItem('cart', JSON.stringify(updatedCart));

    }
};
export const removeItemFromLocalStorage = async (id: number, index: number): Promise<void> => {
    const cart = localStorage.getItem('cart');
    if (cart) {
        const parsedCart = JSON.parse(cart);
        const updatedCart = parsedCart.filter((item: Response, idx: number) => item.id !== id || idx !== index);
        // localStorage.setItem('cart', JSON.stringify(updatedCart));
        LocalStorageAPI.setItem(EStorageItems.CART, updatedCart);

    }
};
export const addItemToLocalStorage = async (id: number, index: number): Promise<void> => {
    const cart = localStorage.getItem('cart');
    let updatedCart: Response[] = [];
    let item: Response | undefined;

    if (cart) {
        const parsedCart = JSON.parse(cart);
        item = parsedCart.find((cartItem: Response) => cartItem.id === id);

        if (item) {
            updatedCart = [...parsedCart];
            updatedCart.splice(index, 0, item);
        } else {
            throw new Error(`Item with id ${id} not found`);
        }
    }
    LocalStorageAPI.setItem(EStorageItems.CART, updatedCart);
    // localStorage.setItem('cart', JSON.stringify(updatedCart));
};

export const addProductToCart = async (product: Response) => {
    const cart = localStorage.getItem('cart');
    if (cart) {
        const parsedCart = JSON.parse(cart);
        const updatedCart = [...parsedCart, product];
        LocalStorageAPI.setItem(EStorageItems.CART, updatedCart);
        // localStorage.setItem('cart', JSON.stringify(updatedCart));
        return updatedCart;
    } else {
        const newCart = [product];
        LocalStorageAPI.setItem(EStorageItems.CART, newCart);
        // localStorage.setItem('cart', JSON.stringify(newCart));
        return newCart;
    }
};

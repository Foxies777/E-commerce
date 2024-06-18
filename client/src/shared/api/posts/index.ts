import { Response } from "./model";

export const createProduct = async (products: Response) => {
        const res = products;
        return res;
}
export const getProduct = async (): Promise<Response[]> => {
        const products = localStorage.getItem('products');
        return products ? JSON.parse(products) : [];
};

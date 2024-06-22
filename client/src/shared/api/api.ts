import ky, { HTTPError } from "ky"

export const api = ky.create({
    prefixUrl: import.meta.env.VITE_API_URL, 
    headers: {
      'Content-Type': 'application/json',
    },
    hooks: {
      beforeRequest: [
        request => {
          const token = localStorage.getItem('token'); 
          if (token) {
            request.headers.set('Authorization', `Bearer ${token}`);
          }
        }
      ]
    }
  });
export class ValidationError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "ValidationError";
    }
}

export const errorHandler = async (error: unknown) => {
    const httpError = error as HTTPError;
    if (httpError.name === "HTTPError") {
        const serverMessage = await httpError.response.text();
        throw new Error(serverMessage);
    } else {
        if (error instanceof ValidationError) {
            throw error;
        } else {
            throw new Error(httpError.message);
        }
    }
}

function validateEmailAndPassword(email: string, password: string) {
    // Проверка валидности email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        throw new ValidationError("Invalid email format");
    }

    if (password.length < 8) {
        throw new ValidationError("Password must be at least 8 characters long");
    }
}

try {
    validateEmailAndPassword("invalidemail", "short");
} catch (error) {
    errorHandler(error);
}




export enum EStorageItems {
    CART = "cart",
    PRODUCTS = "products",
    USERS = "users",
    USER = "user"
}

type TStorageDataCart = {
    id: string;
    count: number;
    img: string;
    title: string;
    description: string;
    price: number;
    user_id: string;
};
type TStorageDataProducts = { productId: string };
type TStorageDataUsers = { id: string };
type TStorageDataUser = { id: string };

type TStorageData<T extends string> =
    T extends EStorageItems.CART[] ? TStorageDataCart :
    T extends EStorageItems.PRODUCTS ? TStorageDataProducts :
    T extends EStorageItems.USERS ? TStorageDataUsers :
    T extends EStorageItems.USER ? TStorageDataUser :
    unknown;

export class LocalStorageAPI {
    public static setItem<T extends EStorageItems>(
        type: T,
        data: TStorageData<T>
    ) {
        localStorage.setItem(type, JSON.stringify(data));
    }
}
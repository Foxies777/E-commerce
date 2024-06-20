import { ValidationError, api, errorHandler } from "../api";
import { Body, Response } from "./model";

export const signIn = async (json: Body) => {
    try {
        if (!isValidEmail(json.email)) {
            throw new ValidationError("Неверно указана почта");
        }

        if (!isValidPassword(json.password)) {
            throw new ValidationError("Длина пароля должна составлять не менее 8 символов");
        }

        const res = await api.post("login", { json }).json<Response>();
        return res;
    } catch (error) {
        console.error('Error during sign-in:', error);
        return await errorHandler(error);
    }
}

export const signUp = async (json: Omit<Body, 'id'>) => {
    try {
        if (!isValidEmail(json.email)) {
            throw new ValidationError('Неверно указана почта');
        }

        if (!isValidPassword(json.password)) {
            throw new ValidationError('Длина пароля должна составлять не менее 8 символов');
        }

        const res: Response = await api.post("register", { json }).json<Response>();
        return res;
    } catch (error) {
        return await errorHandler(error);
    }
};

// Функция для проверки валидности email
function isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Функция для проверки валидности пароля
function isValidPassword(password: string): boolean {
    return password.length >= 8;
}

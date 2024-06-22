import { jwtDecode } from "jwt-decode";
import { ValidationError, api, errorHandler } from "../api";
import { Body, Response, User } from "./model";

export const signIn = async (json: Body): Promise<Response> => {
    try {
        if (!isValidEmail(json.email)) {
            throw new ValidationError("Неверно указана почта");
        }

        if (!isValidPassword(json.password)) {
            throw new ValidationError("Длина пароля должна составлять не менее 8 символов");
        }

        const res = await api.post("users/login", { json }).json<Response>();
        return res;
    } catch (error) {
        console.error('Error during sign-in:', error);
        return await errorHandler(error);
    }
}

export const signUp = async (json: Omit<Body, 'id'>): Promise<Response> => {
    try {
        if (!isValidEmail(json.email)) {
            throw new ValidationError('Неверно указана почта');
        }

        if (!isValidPassword(json.password)) {
            throw new ValidationError('Длина пароля должна составлять не менее 8 символов');
        }

        const res = await api.post("users/registration", { json }).json<Response>();
        return res;
    } catch (error) {
        return await errorHandler(error);
    }
};

export const getUser = async (token: string): Promise<User> => {
    try {
        // Предположим, что токен JWT и содержит ID пользователя
        const decodedToken: { id: string } = jwtDecode(token);
        const userId = decodedToken.id;

        const res = await api.get(`users/getUser/${userId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        }).json<User>();
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

import { ValidationError, errorHandler } from "../api";
import { Body } from "./model";

export const signIn = async (json: Body) => {
    try {
        if (!isValidEmail(json.email)) {
            throw new ValidationError("Неверно указана почта");
        }

        if (!isValidPassword(json.password)) {
            throw new ValidationError("Длина пароля должна составлять не менее 8 символов");
        }

        const storedEmail = localStorage.getItem('email');
        const storedPassword = localStorage.getItem('password');

        if (storedEmail !== json.email || storedPassword !== json.password) {
            throw new ValidationError("Неверные почта или пароль");
        }

        const res = json;
        return res;
    } catch (error) {
        return await errorHandler(error);
    }
}

export const signUp = async (json: Body) => {
    console.log(json);

    try {
        if (!isValidEmail(json.email)) {
            throw new ValidationError("Неверно указана почта");
        }

        if (!isValidPassword(json.password)) {
            throw new ValidationError("Длина пароля должна составлять не менее 8 символов");
        }

        const res = json
        // const res = await api.post("register", { json }).json<Response>();
        return res;
    } catch (error) {
        return await errorHandler(error);
    }
}

function isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Функция для проверки валидности пароля
function isValidPassword(password: string): boolean {
    return password.length >= 8;
}

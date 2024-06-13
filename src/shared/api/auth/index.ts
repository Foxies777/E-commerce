import { ValidationError, errorHandler } from "../api";
import { Body } from "./model";
import { v4 as uuidv4 } from 'uuid';

export const signIn = async (json: Body): Promise<Body> => {
    const users = localStorage.getItem('users');
    const parsedUsers: Body[] = users ? JSON.parse(users) : [];


    const findUser: Body | undefined = parsedUsers.find(user => user.email === json.email && user.password === json.password);

    try {
        if (!isValidEmail(json.email)) {
            throw new ValidationError("Неверно указана почта");
        }

        if (!isValidPassword(json.password)) {
            throw new ValidationError("Длина пароля должна составлять не менее 8 символов");
        }

        if (!findUser) {
            throw new ValidationError("Неверные почта или пароль");
        }

        console.log(findUser);

        return findUser;
    } catch (error) {
        console.error('Error during sign-in:', error);
        return await errorHandler(error);
    }
}

export const signUp = async (json: Omit<Body, 'id'>): Promise<Body> => {
    try {
        if (!isValidEmail(json.email)) {
            throw new ValidationError('Неверно указана почта');
        }

        if (!isValidPassword(json.password)) {
            throw new ValidationError('Длина пароля должна составлять не менее 8 символов');
        }
        const existingUser = await getUserByEmail(json.email);
        if (existingUser) {
            throw new ValidationError('Пользователь с такой почтой уже существует');
        }
        const res: Body = {
            id: uuidv4(),
            ...json,
        };
        console.log(res);

        return res;
    } catch (error) {
        return await errorHandler(error);
    }
};

export const getUserByEmail = async (email: string): Promise<Body | null> => {
    const users = await getUsers();
    return users.find(user => user.email === email) || null;
};

export const getUsers = async (): Promise<Body[]> => {
    const users = localStorage.getItem('users');
    return users ? JSON.parse(users) : [];
};

export const getUser = async (): Promise<Body | null> => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
};

function isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Функция для проверки валидности пароля
function isValidPassword(password: string): boolean {
    return password.length >= 8;
}

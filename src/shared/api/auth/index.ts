import { ValidationError, errorHandler } from "../api";
import { Body } from "./model";

export const signIn = async (json: Body): Promise<Body | void> => {
    const users = localStorage.getItem('users');
    let parsedUsers: Body[] = users ? JSON.parse(users) : [];

    console.log('Parsed users:', parsedUsers);

    let findUser: Body | undefined = parsedUsers.find(user => user.email === json.email && user.password === json.password);

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

        console.log('User found:', findUser);

        return findUser;
    } catch (error) {
        console.error('Error during sign-in:', error);
        return await errorHandler(error);
    }
}


export const signUp = async (json: Body) => {

    try {
        if (!isValidEmail(json.email)) {
            throw new ValidationError("Неверно указана почта");
        }

        if (!isValidPassword(json.password)) {
            throw new ValidationError("Длина пароля должна составлять не менее 8 символов");
        }

        const res = json
        console.log(res);

        return res;
    } catch (error) {
        return await errorHandler(error);
    }
}

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

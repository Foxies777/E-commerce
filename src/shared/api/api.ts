import ky, { HTTPError } from "ky"

// export const api = ky.create({prefixUrl: import.meta.env.BASE_URL})

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

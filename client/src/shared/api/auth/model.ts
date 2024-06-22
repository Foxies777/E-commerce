export type Body = {
    id: string;
    email: string;
    password: string;
}

export type Response = {
    token: any;
    accessToken: string;
    user: { email: string; id: number };
}

export type User = {
    id: string;
    email: string;
    password: string;
}

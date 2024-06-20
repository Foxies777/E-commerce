export type Body = {
    id: string;
    email: string;
    password: string;
}
export type Response = {
    accessToken: string;
    user: { email: string; id: number };
  };
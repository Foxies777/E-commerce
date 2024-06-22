// pages/Profile/types/model.ts
import { createEffect, restore } from "effector";
import { getUser } from "../../../shared/api/auth";
import { User } from "../../../shared/api/auth/model";

export const getUserFx = createEffect<string, User>(async (token) => {
  const user = await getUser(token);
  return user;
});
export const $user = restore<User | null>(getUserFx.doneData, null);

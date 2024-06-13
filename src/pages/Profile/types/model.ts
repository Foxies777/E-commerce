import { createEffect, restore } from "effector";
import { getUser } from "../../../shared/api/auth";


export const getUserFx = createEffect(getUser);
export const $user = restore(getUserFx, null);

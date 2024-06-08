import { createEffect, sample } from "effector";
import { signIn } from "../../shared/api/auth";
import { addUser } from "../../shared/auth";
import { showErrorMessageFx } from "../../shared/notification";

export const signInFx = createEffect(signIn)

sample({
    clock: signInFx.doneData,
    fn: (response) => ({
        email: response.email,
        password: response.password,

    }),
    target: addUser,
});

sample({
    clock: signInFx.failData,
    target: showErrorMessageFx,
});
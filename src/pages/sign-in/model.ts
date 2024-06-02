import { createEffect, sample } from "effector";
import { signIn } from "../../shared/api/auth";
import { emailRecieved, passwordRecieved } from "../../shared/auth";
import { showErrorMessageFx } from "../../shared/notification";

export const signInFx = createEffect(signIn)


sample({
    clock: signInFx.doneData,
    fn: (clk) => clk.email,
    target: emailRecieved
})

sample({
    clock: signInFx.doneData,
    fn: (clk) => clk.password,
    target: passwordRecieved
})

sample({
    clock: signInFx.failData,
    target: showErrorMessageFx
})
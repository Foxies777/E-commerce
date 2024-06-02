import { createEffect, sample } from "effector";
import { signUp } from "../../shared/api/auth";
import { emailRecieved,passwordRecieved } from "../../shared/auth";
import { showErrorMessageFx } from "../../shared/notification";

export const signUpFx = createEffect(signUp)


sample({
    clock: signUpFx.doneData,
    fn: (clk) => clk.email,
    target: emailRecieved
})

sample({
    clock: signUpFx.doneData,
    fn: (clk) => clk.password,
    target: passwordRecieved
})

sample ({
    clock: signUpFx.failData,
    target: showErrorMessageFx
})
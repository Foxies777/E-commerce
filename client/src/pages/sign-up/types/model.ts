import { signUp } from "../../../shared/api/auth/";
import { $token, tokenRecived } from "../../../shared/auth";
import { showErrorMessageFx } from "../../../shared/notification";
import { createEffect, sample } from "effector";

export const signUpFx = createEffect(signUp);

sample({
  clock: signUpFx.doneData,
  source: $token,
  fn(_, clk) {
    return clk.accessToken;
  },
  target: tokenRecived,
});


sample({
  clock: signUpFx.failData,
  target: showErrorMessageFx,
});
import { signIn } from "../../../shared/api/auth";
import { $token, tokenRecived } from "../../../shared/auth";
import { showErrorMessageFx } from "../../../shared/notification";
import { createEffect, sample } from "effector";

export const signInFx = createEffect(signIn);

sample({
  clock: signInFx.doneData,
  source: $token,
  fn(_, clk) {
    return clk.accessToken;
  },
  target: tokenRecived,
});


sample({
  clock: signInFx.failData,
  target: showErrorMessageFx,
});
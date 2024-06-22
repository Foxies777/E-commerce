import { signIn } from "../../../shared/api/auth";
import { $token, tokenRecived } from "../../../shared/auth";
import { showErrorMessageFx } from "../../../shared/notification";
import { createEffect, sample } from "effector";

export const signInFx = createEffect(signIn);

sample({
  clock: signInFx.doneData,
  fn: (response) => {
    console.log("signInFx.doneData response:", response);
    return response.token;
  },
  target: tokenRecived,
});

sample({
  clock: signInFx.failData,
  target: showErrorMessageFx,
});

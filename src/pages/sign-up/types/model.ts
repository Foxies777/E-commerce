import { createEffect, sample } from 'effector';
import { signUp } from '../../../shared/api/auth';
import { addUser } from '../../../shared/auth';
import { showErrorMessageFx } from '../../../shared/notification';

export const signUpFx = createEffect(signUp);

sample({
    clock: signUpFx.doneData,
    fn: (response) => {
        return {
            id: response.id,
            email: response.email,
            password: response.password,
        };
    },
    target: addUser,
});

sample({
    clock: signUpFx.failData,
    target: showErrorMessageFx,
});
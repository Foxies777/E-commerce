import { createEvent, createStore } from "effector";
import { persist } from "effector-storage/local";

const $email = createStore('')
const $password = createStore('')
export const emailRecieved = createEvent<string>()
export const emailExpired = createEvent()
export const passwordRecieved = createEvent<string>()
export const passwordExpired = createEvent()

$email.on(emailRecieved, (_, email) => email).reset(emailExpired)
$password.on(passwordRecieved, (_, password) => password).reset(passwordExpired)

export const $isAuth = $email.map(email => !!email)

persist({
    key: 'email',
    store: $email,
    serialize: (value) => value,
    deserialize: (value) => value
})

persist({
    key: 'password',
    store: $password,
    serialize: (value) => value,
    deserialize: (value) => value
})
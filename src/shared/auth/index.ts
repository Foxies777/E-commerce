import { createEvent, createStore, createEffect, sample } from 'effector';
import { persist } from 'effector-storage/local';
import { signIn } from '../../shared/api/auth';
import { showErrorMessageFx } from '../../shared/notification';

// Define user type
interface User {
  email: string;
  password: string;
}

// Create stores and events for handling users
const $users = createStore<User[]>([]);
export const addUser = createEvent<User>();
export const removeUser = createEvent<void>();

export const $user = createStore<User | null>(null);
export const fetchUserFx = createEffect(async (): Promise<User | null> => {
  const userString = localStorage.getItem('user');
  if (userString) {
    return JSON.parse(userString) as User;
  }
  return null;
});

$user
  .on(addUser, (_, user) => user)
  .reset(removeUser)
  .on(fetchUserFx.doneData, (_, user) => user);

$users.on(addUser, (state, user) => [...state, user]);

persist({
  key: 'users',
  store: $users,
  serialize: (users) => JSON.stringify(users),
  deserialize: (value) => {
    const parsed = JSON.parse(value);
    return Array.isArray(parsed) ? parsed : [];
  },
});

persist({
  key: 'user',
  store: $user,
  serialize: (value) => JSON.stringify(value),
  deserialize: (value) => {
    return value ? JSON.parse(value) : null;
  },
});

export const signInFx = createEffect(signIn);

sample({
  clock: signInFx.doneData,
  fn: (response) => {
    console.log(response);
    return {
      email: response.email,
      password: response.password,
    };
  },
  target: addUser,
});

sample({
  clock: signInFx.failData,
  target: showErrorMessageFx,
});

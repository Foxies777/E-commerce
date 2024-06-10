import { createEvent, createStore, createEffect } from 'effector';
import { persist } from 'effector-storage/local';

interface User {
  id: string;
  email: string;
  password: string;
}

const $users = createStore<User[]>([]);
export const addUser = createEvent<User>();
export const logout = createEvent<void>();

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
  .on(fetchUserFx.doneData, (_, user) => user)
  .reset(logout);

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


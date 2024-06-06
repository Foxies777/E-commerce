import { createEvent, createStore } from 'effector';
import { persist } from 'effector-storage/local';

// Define user type
interface User {
    email: string;
    password: string;
}

// Create stores and events for handling users
const $users = createStore<User[]>([]);
export const addUser = createEvent<User>();
export const removeUser = createEvent<void>();

const $user = createStore<User | null>(null);

$user
    .on(addUser, (_, user) => user)
    .reset(removeUser);

$users.on(addUser, (state, user) => [...state, user]);
persist({
    key: 'users',
    store: $users,
    serialize: (users) => JSON.stringify(users),
    deserialize: (value) => {
        const parsed = JSON.parse(value);
        return Array.isArray(parsed) ? parsed : [];
    },
})

persist({
    key: 'user',
    store: $user,
    serialize: (value) => JSON.stringify(value),
    deserialize: (value) => JSON.parse(value)
});
// localStorage.clear();
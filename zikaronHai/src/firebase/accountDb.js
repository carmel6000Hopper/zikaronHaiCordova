import { fbData } from './firebase';

// User API

export const doCreateUser = (id, username, email) =>
    fbData.ref(`users/${id}`).set({
        username,
        email,
    });

export const onceGetUsers = () =>
    fbData.ref('users').once('value');


import { writable } from 'svelte/store';

export const UserStore = writable({ user: { id: null }, isLoggedIn: true });
export const isLoggedIn = writable(false);
export const userId = writable(null);
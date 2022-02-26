import { writable } from 'svelte/store';
import type { User } from 'firebase/auth';
import { Account } from '../utils/account';

export const UserStore = writable({ user: { id: null }, isLoggedIn: true });
export const isLoggedIn = writable(false);
export const userId = writable(null);
export const userDetails = writable<Account>(Account.empty());

const authStore = writable<{
	isLoggedIn: boolean;
	user?: User;
	firebaseControlled: boolean;
}>({
	isLoggedIn: false,
	firebaseControlled: false
});

export default {
	subscribe: authStore.subscribe,
	set: authStore.set
};
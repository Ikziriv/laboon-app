import { writable } from 'svelte/store';
import type { User } from 'firebase/auth';

export const UserStore = writable({ user: { id: null }, isLoggedIn: true });
export const isLoggedIn = writable(false);
export const userId = writable(null);
export const userDetails = writable<{
	roomId: string;
	uid: string;
	displayName: string;
	photoURL: string;
	message: string;
}>(null);

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
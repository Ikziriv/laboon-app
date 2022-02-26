import { writable } from 'svelte/store';

export const modal = writable(null);
export const windowStyle = writable({});

export const sideAbout = writable<boolean>(false);
export const sideFaq = writable<boolean>(false);
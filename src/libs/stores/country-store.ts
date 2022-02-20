import { writable } from 'svelte/store';

const country = writable<{
	id: string,
    name: string
}>(null);

export default {
	subscribe: country.subscribe,
	set: country.set
};
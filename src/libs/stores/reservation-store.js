import { writable } from 'svelte/store';
import { supabase } from "../../supabase.js";
export const reservations = writable([]);

export const loadReservations = async() => {
    const { data, error } = await supabase.from('reservation').select();
    if (error) {
        return console.error(error);
    }
    reservations.set(data);
}
loadReservations();

export const addReservation = async( /** @type {any} */ text, /** @type {any} */ user_id) => {
    const { data, error } = await supabase.from('reservation').insert([{ text, user_id }]);

    if (error) {
        return console.error(error);
    }

    reservations.update(cur => [...cur, data[0]]);
};

export const deleteReservation = async( /** @type {any} */ id) => {
    const { error } = await supabase.from('reservation').delete().match({ id });

    if (error) {
        return console.error(error);
    }

    reservations.update((reservations) => reservations.filter((reservation) => reservation.id !== id));
};

export const toggleReservationCompleted = async( /** @type {any} */ id, /** @type {any} */ currentState) => {
    const { error } = await supabase.from('reservation').update({ completed: !currentState }).match({ id })

    if (error) {
        return console.error(error);
    }

    reservations.update((reservations) => {
        let index = -1;
        for (let i = 0; i < reservations.length; i++) {
            if (reservations[i].id === id) {
                index = i;
                break;
            }
        }
        if (index !== -1) {
            reservations[index].completed = !reservations[index].completed;
        }
        return reservations;
    });
};
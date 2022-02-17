import { writable } from 'svelte/store';
import { db } from "../firebase";
import type { Reservation } from "../models";
import { onSnapshot } from 'firebase/firestore';
import {
    addDoc,
    collection,
    CollectionReference,
    deleteDoc,
    doc,
    orderBy,
    query,
    serverTimestamp,
    updateDoc,
    where
} from 'firebase/firestore';

export const getReservations = (uid: string) => writable < Reservation[] > (null, (set) => {
    const unsubscribe = onSnapshot < Reservation[] > (
        query < Reservation[] > (
            collection(db, 'reservations') as CollectionReference < Reservation[] > ,
            where('uid', '==', uid),
            orderBy('created')
        ), (q) => {
            const reservations = [];
            q.forEach((doc) => reservations.push({...doc.data(), id: doc.id }));
            set(reservations);
        });
    return () => {
        if (unsubscribe) {
            unsubscribe();
        }
    }
});

export const addReservation = (uid: string, rsvName: string, phone: string, text: string, email: string, rsvCode: string) => {
    addDoc(collection(db, 'reservations'), {
        uid,
        rsvName,
        phone,
        text,
        email,
        rsvCode,
        complete: false,
        created: serverTimestamp()
    });
}

export const updateReservation = (id: string, newStatus: boolean) => {
    updateDoc(doc(db, 'reservations', id), { complete: newStatus });
}

export const deleteReservation = (id: string) => {
    deleteDoc(doc(db, 'reservations', id));
}
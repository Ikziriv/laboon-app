import { readable } from 'svelte/store';
import { firebaseApp } from "../firebase";
import type { UserRec } from "../models";
import type { User } from 'firebase/auth';
import {
    getAuth,
    GoogleAuthProvider,
    onIdTokenChanged,
    signInWithPopup,
    signOut
} from 'firebase/auth';

const auth = getAuth(firebaseApp);

export async function loginWithGoogle() {
    return await signInWithPopup(auth, new GoogleAuthProvider());
}

export async function logout() {
    return await signOut(auth);
}

export const user = readable<UserRec>(null, set => {
    const unsubscribe = onIdTokenChanged(auth, (u: User) => set(u));
    return () => {
        if (unsubscribe) {
            unsubscribe();
        }
    }
});
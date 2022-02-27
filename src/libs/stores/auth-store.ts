import { readable } from 'svelte/store';
import { firebaseApp, getAuthClient } from "../utils/firebase";
import type { UserRec } from "../models";
import type { User } from 'firebase/auth';
import {
    getAuth,
    GoogleAuthProvider,
    onIdTokenChanged,
    signInWithPopup,
    signOut
} from 'firebase/auth';

export async function loginWithGoogle() {
    const auth = await getAuthClient();
    return await signInWithPopup(auth, new GoogleAuthProvider());
}

export async function logout() {
    const auth = await getAuthClient();
    return await signOut(auth);
}

export const user = readable<UserRec>(null, set => {
    const auth = getAuth(firebaseApp);
    const unsubscribe = onIdTokenChanged(auth, (u: User) => set(u));
    return () => {
        if (unsubscribe) {
            unsubscribe();
        }
    }
});
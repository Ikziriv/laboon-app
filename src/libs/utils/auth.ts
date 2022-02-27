import {
	getAuth,
	signInWithRedirect,
	signOut as _signOut,
	GoogleAuthProvider,
	signInWithPopup
} from 'firebase/auth';

import { getAuthClient } from './firebase';
import { Account } from './account';

function providerFor(name: string) {
	switch (name) {
		case 'google':
			return new GoogleAuthProvider();
		default:
			throw 'unknown provider ' + name;
	}
}

export async function signInWith(name: string) {
	const auth = await getAuthClient();
	const provider = providerFor(name);
	await signInWithRedirect(auth, provider);
}

export async function signInGoogleWithPopup(): Promise<Account> {
	const auth = await getAuthClient();
	const { signInWithPopup, GoogleAuthProvider } = await import('firebase/auth');
	const { user } = await signInWithPopup(auth, new GoogleAuthProvider());
  
	return Account.loggedIn({
		uid: user.uid,
		displayName: user.displayName,
		email: user.email,
		photoURL: user.photoURL
	});
}

export async function signOut(): Promise<Account> {
  const auth = await getAuthClient();
  const { signOut } = await import('firebase/auth');
  await signOut(auth);

  return Account.loggedOut();
}
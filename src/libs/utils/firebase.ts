import { initializeApp } from 'firebase/app';
import type { FirebaseApp, FirebaseOptions } from 'firebase/app';
import type { Firestore } from 'firebase/firestore';
import type { Analytics } from "firebase/analytics";
import type { Auth } from 'firebase/auth';
import type { Database } from 'firebase/database';
import type { FirebaseStorage } from 'firebase/storage';
import { getFirestore } from 'firebase/firestore';
import { getAnalytics } from "firebase/analytics";
import { getAuth, onIdTokenChanged } from 'firebase/auth';
import { session } from '$app/stores';

export let app: FirebaseApp;
export let db: Firestore;
export let analytics: Analytics;

export function initializeFirebase(options: FirebaseOptions) {
	if (!app) {
		app = initializeApp(options);
		analytics = getAnalytics(app);
		db = getFirestore(app);
		listenForAuthChanges();
	}
}

// export async function getAnalyticsClient(): Promise<Analytics> {
// 	const { getAnalytics } = await import('firebase/analytics');
// 	return getAnalytics(app);
// }

export async function getAuthClient(): Promise<Auth> {
	const { getAuth } = await import('firebase/auth');
	return getAuth(app);
}

export async function getDatabaseClient(): Promise<Database> {
	const { getDatabase } = await import('firebase/database');
	return getDatabase(app);
}

export async function getFirestoreClient(): Promise<Firestore> {
	const { getFirestore } = await import('firebase/firestore');
	return getFirestore(app);
}

export async function getStorageClient(): Promise<FirebaseStorage> {
	const { getStorage } = await import('firebase/storage');
	return getStorage(app);
}

function listenForAuthChanges() {
	const auth = getAuth(app);

	onIdTokenChanged(
		auth,
		async (user) => {
			if (user) {
				const token = await user.getIdToken();
				await setToken(token);
				session.update((oldSession) => {
					const thisSession: any = oldSession;
					thisSession.user = {
						name: user.displayName,
						email: user.email,
						uid: user.uid
					};
					return thisSession;
				});
			} else {
				await setToken('');
				session.set({});
			}
		},
		(err) => console.error(err.message)
	);
}

async function setToken(token: string) {
	const options = {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json;charset=utf-8'
		},
		body: JSON.stringify({ token })
	};

	await fetch('/api/token', options);
}
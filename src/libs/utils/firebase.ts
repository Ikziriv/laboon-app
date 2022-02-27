import { initializeApp, getApps, getApp } from 'firebase/app';
import type { FirebaseApp, FirebaseOptions } from 'firebase/app';
import type { Firestore } from 'firebase/firestore';
import type { Analytics } from "firebase/analytics";
import type { Auth } from 'firebase/auth';
import type { Database } from 'firebase/database';
import type { FirebaseStorage } from 'firebase/storage';
import { getFirestore, enableIndexedDbPersistence } from 'firebase/firestore';
import { getAnalytics } from "firebase/analytics";
import { getAuth, onIdTokenChanged } from 'firebase/auth';
import { Writable, writable } from 'svelte/store';
import { session } from '$app/stores';

export let app: Writable<FirebaseApp> = writable(null);
export let db: Firestore;
export let analytics: Analytics;

export let firebaseApp: FirebaseApp = null;

export function initializeFirebase(options: FirebaseOptions) {
	if (firebaseApp) {
		return firebaseApp;
	}
	
	if (getApps().length === 0) {
		firebaseApp = initializeApp(options);
		analytics = getAnalytics(firebaseApp);
		db = getFirestore(firebaseApp);
		listenForAuthChanges();
		console.log('firebase initialized on client');
	
		enableIndexedDbPersistence(db).catch((err) => {
		  if (err.code == 'failed-precondition') {
			console.warn(
			  'When multiple tabs open, Firestore persistence can only be enabled in one tab at a time.'
			);
		  } else if (err.code == 'unimplemented') {
			console.warn(
			  'The current browser does not support all of the features required to enable Firestore persistence.'
			);
		  }
		});
	} else {
		firebaseApp = getApp();
	}

	app.set(firebaseApp);
	return firebaseApp;
}

// export async function getAnalyticsClient(): Promise<Analytics> {
// 	const { getAnalytics } = await import('firebase/analytics');
// 	return getAnalytics(app);
// }

export async function getAuthClient(): Promise<Auth> {
	const { getAuth } = await import('firebase/auth');
	return getAuth(firebaseApp);
}

export async function getDatabaseClient(): Promise<Database> {
	const { getDatabase } = await import('firebase/database');
	return getDatabase(firebaseApp);
}

export async function getFirestoreClient(): Promise<Firestore> {
	const { getFirestore } = await import('firebase/firestore');
	return getFirestore(firebaseApp);
}

export async function getStorageClient(): Promise<FirebaseStorage> {
	const { getStorage } = await import('firebase/storage');
	return getStorage(firebaseApp);
}

function listenForAuthChanges() {
	const auth = getAuth(firebaseApp);

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
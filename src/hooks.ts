import cookie from 'cookie';
import type { Handle, RequestEvent } from '@sveltejs/kit';
import type { DecodedIdToken } from 'firebase-admin/lib/auth/token-verifier';
import { decodeToken } from './libs/server/firebase';
import { publicPages } from './libs/utils/constants';
import { FIREBASE_CLIENT_CONFIG } from './libs/server/constants';

export async function getSession(event: RequestEvent) {
	const locals: any = event.locals;
	const decodedToken: DecodedIdToken | null = locals.decodedToken;
	const firebaseClientConfig = {
    "apiKey": "AIzaSyBk52yhco1B_HJtZEcu1DvSNhEKj5AFKlY",
    "authDomain": "laboon-app.firebaseapp.com",
    "databaseURL": "https://laboon-app-default-rtdb.asia-southeast1.firebasedatabase.app/",
    "projectId": "laboon-app",
    "storageBucket": "laboon-app.appspot.com",
    "messagingSenderId": "582128073252",
    "appId": "1:582128073252:web:fe89ec5871d7054640b6b1",
    "measurementId": "G-84NGMZBGDJ"
};

	if (decodedToken) {
		const { uid, name, email } = decodedToken;

		return { user: { name, email, uid }, firebaseClientConfig };
	} else {
		return { user: null, firebaseClientConfig };
	}
}

export const handle: Handle = async ({ event, resolve }) => {
	const locals: any = event.locals;
	const cookies = cookie.parse(event.request.headers.get('cookie') || '');
	locals.decodedToken = await decodeToken(cookies.token);
	if (!locals.decodedToken && !publicPages.includes(event.url.pathname)) {
		// If you are not logged in and you are not on a public page,
		// it just redirects you to the main page, which is / in this case.
		event.request.headers.append('Location', '/');
		event.request.headers.append('status', '302');
		return await resolve(event);
	}

	const response = await resolve(event);

	return response;
};
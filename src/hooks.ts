import cookie from 'cookie';
import { v4 as uuid } from '@lukeed/uuid';
import type { Handle } from '@sveltejs/kit';
import type { DecodedIdToken } from 'firebase-admin/lib/auth/token-verifier';
import { decodeToken } from './libs/server/firebase';
import { publicPages } from './libs/utils/constants';
import { firebaseConfig } from './libs/config'
// import { FIREBASE_CLIENT_CONFIG } from './libs/server/constants';

export async function getSession(event: any) {
	const locals: any = event.locals;
	const decodedToken: DecodedIdToken | null = locals.decodedToken;

	if (decodedToken) {
		const { uid, name, email } = decodedToken;

		return { user: { name, email, uid }, firebaseConfig };
	} else {
		return { user: null, firebaseConfig };
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
import cookie from 'cookie';
import { v4 as uuid } from '@lukeed/uuid';
import type { Handle } from '@sveltejs/kit';
import { publicPages } from './libs/constants';

export const handle: Handle = async ({ event, resolve }) => {
	const locals: any = event.locals;
	const cookies = cookie.parse(event.request.headers.get('cookie') || '');
	locals.userid = cookies.userid || uuid();

	const response = await resolve(event)

	if (!cookies.userid && !publicPages.includes(event.url.pathname)) {
		// If you are not logged in and you are not on a public page,
		// it just redirects you to the main page, which is / in this case.
		event.request.headers.append('Location', '/');
		event.request.headers.append('status', '302');
		// if this is the first time the user has visited this app,
		// set a cookie so that we recognise them when they return
		response.headers.set(
			"set-cookie",
			cookie.serialize("userid", locals.userid, {
				path: "/",
				httpOnly: true,
			})
		)
	}
	
	return response;
};
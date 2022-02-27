<script context="module" lang="ts">
	import { getApps, getApp } from 'firebase/app';
	import { publicPages } from '../libs/constants';
	import { initializeFirebase } from '../libs/utils/firebase';
	import { UserStore, userId, isLoggedIn } from '../libs/stores/user';
	import { browser } from '$app/env';
	import { firebaseConfig } from '../libs/config';

	export async function load({ url, session }: LoadInput) {
		const thisSession: any = session;
		const firebaseApp = browser && (getApps.length === 0 ? initializeFirebase(firebaseConfig) : getApp)

		if (browser) {
			if(thisSession.user) {
				console.log(thisSession.user);

				isLoggedIn.set(true);
				UserStore.set({ user: { id: thisSession.user.uid }, isLoggedIn: true });
				userId.set(thisSession.user.uid);
				
				console.log(UserStore);
			}
			else {
				isLoggedIn.set(false);
				UserStore.set(null);
				userId.set(null);
			}
		}

		if (!thisSession.user && !publicPages.includes(url.pathname)) {
			return { redirect: '/', status: 302 };
		} else {
			return {};
		}

		console.log({ firebaseApp });
	}
</script>
<script lang="ts">
	import { navigating } from '$app/stores';
    import type { LoadInput } from '@sveltejs/kit';
    import { 
		Header, 
		Footer, 
		PageTransition,
		PageLoading
	} from "../libs/components/index";

	import { loading } from '../libs/utils/loading'

	import '../styles/css/app.css';

	let sideAbout = false;
	let sideFaq = false;

	$: loading.setNavigate(!!navigating)
</script>

<!-- <PageLoading /> -->
<div class="w-full h-auto md:h-screen relative">
    <Header classes="fixed inset-x-0 top-0" />
    <main class="w-full h-auto relative">
		<PageTransition>
        	<slot />
		</PageTransition>
    </main>
    <Footer classes="fixed inset-x-0 bottom-0" />
</div>
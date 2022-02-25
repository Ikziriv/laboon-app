<script context="module" lang="ts">
	import { publicPages } from '../libs/utils/constants';
	import { initializeFirebase } from '../libs/utils/firebase';
	import { UserStore, userId, isLoggedIn } from '../libs/stores/user';
	import { browser } from '$app/env';
	export async function load({ url, session }: LoadInput) {
		const thisSession: any = session;
		if (browser) {
			initializeFirebase(thisSession.firebaseClientConfig);
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
	}
</script>
<script lang="ts">
	import { navigating } from '$app/stores';
    import type { LoadInput } from '@sveltejs/kit';
    import { 
		Header, 
		Footer, 
		PageTransition,
		Modal, 
		ModalAbout, 
		ModalBackDrop,
		PageLoading
	} from "../libs/components/index";
	import { loading } from '../libs/utils/loading'
	import '../styles/css/app.css';

	let modalAbout = false;

	$: loading.setNavigate(!!navigating)
</script>
<!-- <PageLoading /> -->
<div class="w-full h-auto md:h-screen relative">
    <Header {modalAbout} classes="fixed inset-x-0 top-0" />
    <main class="w-full h-auto relative">
		<PageTransition>
        	<slot />
		</PageTransition>
    </main>
    <Footer classes="fixed inset-x-0 bottom-0" />
</div>

<Modal isOpen={modalAbout} index={1} isSidePanel={false} >
    <ModalAbout />
</Modal>

<ModalBackDrop />
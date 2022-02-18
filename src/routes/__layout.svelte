<script context="module" lang="ts">
	import { publicPages } from '../libs/utils/constants';
	import { initializeFirebase } from '../libs/utils/firebase';
	import { browser } from '$app/env';
	export async function load({ url, session }: LoadInput) {
		const thisSession: any = session;
		if (browser) {
			initializeFirebase(thisSession.firebaseClientConfig);
		}
		if (!thisSession.user && !publicPages.includes(url.pathname)) {
			return { redirect: '/', status: 302 };
		} else {
			return {};
		}
	}
</script>
<script lang="ts">
    import type { LoadInput } from '@sveltejs/kit';
    import Header from "../libs/components/Header.svelte"
    import Footer from "../libs/components/Footer.svelte"
	import '../styles/css/app.css';
</script>
<div class="w-full h-screen relative">
    <Header classes="fixed inset-x-0 top-0" />
    <main class="w-full h-auto relative">
        <slot />
    </main>
    <Footer classes="fixed inset-x-0 bottom-0" />
</div>
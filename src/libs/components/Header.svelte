<script lang="ts">
	import { browser } from '$app/env';
	import { session } from '$app/stores';
	import { signOut } from '../../libs/utils/auth';
	import modeStore from '../../libs/stores/theme-store';
	import { sideAbout, sideFaq } from '../../libs/stores/index';
	import { MoonIcon, SunIcon } from '../../libs/components/index';
	import { modal } from '../../libs/stores';
    
    export const classes: string = undefined

	let thisSession: any;
	$: thisSession = $session;
	$: if (browser && $modeStore === true) {
		document.documentElement.classList.add('dark');
	} else if (browser && $modeStore === false) {
		document.documentElement.classList.remove('dark');
	}
    
    // Function About
    function toggleAbout() {
        sideAbout.update((sideAbout) => (sideAbout = !sideAbout))
    }
    
    // Function Faq
    function toggleFaq() {
        sideFaq.update((sideFaq) => (sideFaq = !sideFaq))
    }
</script>
<header class="{classes} w-full h-auto border-b bg-white dark:bg-gray-900">
    <div class="flex flex-col md:flex-row justify-between px-4 md:px-8">
        <div class="flex justify-center py-4 md:py-6">
            <a sveltekit:prefetch href="/" class="flex">
                <span class="font-bold text-2xl tracking-widest mr-2 text-blue-500 dark:text-white">Laboon</span>
                <span class="py-1">
                    <img alt="LaboonLogo" class="w-6" src="data:image/png;base64,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"/>
                </span>
            </a>
        </div>
        <div class="flex flex-row justify-between md:justify-center py-4 md:py-6">
            <div class="flex flex-row">
                <div class="mr-4" on:click={() => toggleAbout()}>
                    <span class="uppercase text-xs font-bold dark:text-white cursor-pointer">
                        <small>About</small>
                    </span>
                </div>
                {#if thisSession.user}
                <div class="mr-8" on:click={() => signOut()}>
                    <span class="uppercase text-xs font-bold cursor-pointer">
                        <small class="tracking-widest text-red-500">Logout</small>
                    </span>
                </div>
                {:else}
                <div class="mr-8">
                    <span class="uppercase text-xs font-bold cursor-pointer">
                        <small class="tracking-widest text-blue-500 dark:text-white">Sign Up</small>
                    </span>
                </div>
                {/if}
                <div class="mr-2" on:click={() => toggleFaq()}>
                    <span class="uppercase text-xs font-bold dark:text-white cursor-pointer">
                        <small>FAQ</small>
                    </span>
                </div>
            </div>
            <div class="ml-4">
                <button
                    type="button"
                    class="bg-transparent px-6 py-1.5 shadow rounded-lg"
                    on:click={() => modeStore.update((m) => (m = !m))}
                    aria-label={`${modeStore ? 'Turn on Light Mode' : 'Turn on Dark Mode'}`}
                >
                    {#if $modeStore === true}
                        <SunIcon classes="fill-current dark:text-white w-2 h-2" />
                    {:else}
                        <MoonIcon classes="fill-current dark:text-white w-2 h-2" />
                    {/if}
                </button>
            </div>
        </div>
    </div>
</header>
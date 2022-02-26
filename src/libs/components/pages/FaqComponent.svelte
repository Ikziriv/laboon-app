<script lang="ts">
	import { browser } from '$app/env';
	import { session } from '$app/stores';
	import { sideFaq } from '../../../libs/stores/index';
    
    export const classes: string = undefined
    // Function FAQ
    function closeFaq() {
        sideFaq.update((sideFaq) => (sideFaq = false))
    }
</script>

{#if $sideFaq}
<div class="absolute right-0 inset-y-0 container w-full h-auto bg-white dark:bg-gray-900 flex flex-col z-30">
    
    <div class="flex flex-col justify-center items-center w-full">
        <div
            class="py-4 px-4 mb-0 bg-white dark:bg-gray-900 flex-1 w-full flex align-middle items-center justify-between border-b"
        >
            <div class="flex flex-col">
                <h2 class="font-bold align-middle text-gray-800 dark:text-white">
                    Laboon FAQ
                </h2>
                <small class="text-gray-700 dark:text-gray-100">A frequently asked questions list </small>
            </div>

            <button
                on:click={() => closeFaq()}
                class="m-0 w-full inline-flex justify-center shadow-sm px-3 py-3 mr-2 md:mr-4 bg-gray-100 dark:bg-gray-900 text-base font-medium text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 dark:focus:ring-gray-400 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm capitalize"
            >
                <svg class="bi bi-x fill-current text-red-500" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                </svg>
            </button>
        </div>

        <div class="flex-1 w-full h-auto md:h-[33rem]">
            
        </div>
    </div>
        
</div>
{/if}
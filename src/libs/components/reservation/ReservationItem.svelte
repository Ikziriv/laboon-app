<script lang="ts">
	import { session } from '$app/stores';
	import { scale } from 'svelte/transition';

	let thisSession: any = $session;
	
	export let rsvtion: { complete: string|boolean; rsvCode: any; rsvName: any; phone: any; text: any; };
	export let onDelete: any;
	export let onChange: (arg0: any) => void;
	
	function handleChange(key: any, value: any) {
		onChange({ ...rsvtion, [key]: value });
	}
	
	$: complete = rsvtion.complete;
</script>

<div class={`${
	rsvtion.complete ? 'border-green-500' : 'border-gray-100'
} flex w-full mx-auto overflow-hidden bg-white rounded-lg shadow-md my-2 relative`} 
    transition:scale|local={{ start: 0.7 }}>
    <div class="px-4 py-2 -mx-3">
        <div class="mx-3">
			<button
				on:click={() => handleChange('done', !rsvtion.complete)}
				class="rounded text-indigo-500 p-2 m-2"
			>
				{complete ? 'Undo' : 'Complete'}
			</button>
        </div>
        <div class="mx-3">
            <span class="font-bold text-gray-900">{rsvtion.rsvCode} / {rsvtion.rsvName} - {rsvtion.phone}</span>
            <p class="text-sm text-gray-700">{rsvtion.text}</p>
        </div>
    </div>

    <div class="absolute inset-y-0 right-0">
        <div class="h-auto w-auto py-4">
			<div on:click={() => onDelete(rsvtion)}>
                <div class="flex items-center justify-center w-16 border-l hover:bg-gray-100">
                    <svg class="bi bi-trash w-6 h-6 text-red-500 fill-current" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                        <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                    </svg>
                </div>
            </div>
        </div>
    </div>
</div>
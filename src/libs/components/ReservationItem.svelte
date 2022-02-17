<script context="module" lang="ts">
	export async function load({ fetch }: LoadInput) {
		const res = await fetch(`/api/data?collectionPath=todos`);
		if (res.ok) {
			const reservationsData = await res.json();
			return {
				props: { reservationsData }
			};
		}
		const { message } = await res.json();
		return {
			error: new Error(message)
		};
	}
</script>
<script lang="ts">
	import type { LoadInput } from '@sveltejs/kit';
	import { session } from '$app/stores';
	import { scale } from 'svelte/transition';
	import { Reservation } from '$libs/models/Reservation';
	import { deleteDocument, getCollectionStore, saveDocument } from '$libs/utils/firebase';

	let thisSession: any = $session;
	export let reservationsData: Array<Partial<Reservation>>;
	let reservations = getCollectionStore(
		Reservation,
		'reservations',
		thisSession.user.uid,
		reservationsData.map((t) => new Reservation(t))
	);
    export const rsvtion: any = {};
    
	async function toggleComplete(rsv: Reservation) {
		rsv.complete = !rsv.complete;
		saveDocument(rsv);
	}

	async function deleteReservation(rsv: Reservation) {
		rsv.pendingDelete = true;
		deleteDocument(rsv);
	}
</script>

<div class="flex w-full mx-auto overflow-hidden bg-white rounded-lg shadow-md my-2 relative" 
    transition:scale|local={{ start: 0.7 }}>
    <div class="px-4 py-2 -mx-3">
        <div class="mx-3">
			<form on:submit|preventDefault={() => toggleComplete(rsvtion)}>
				<input type="hidden" name="done" value={rsvtion.complete ? '' : 'true'} />
				<button class="toggle" aria-label="Mark todo as {rsvtion.complete ? 'not done' : 'done'}" />
			</form>
        </div>
        <div class="mx-3">
            <span class="font-bold text-gray-900">{rsvtion.rsvCode} / {rsvtion.rsvName} - {rsvtion.phone}</span>
            <p class="text-sm text-gray-700">{rsvtion.text}</p>
        </div>
    </div>

    <div class="absolute inset-y-0 right-0">
        <div class="h-auto w-auto py-4">
			<form on:submit|preventDefault={() => deleteReservation(rsvtion)}>
                <div class="flex items-center justify-center w-16 border-l hover:bg-gray-100">
                    <svg class="bi bi-trash w-6 h-6 text-red-500 fill-current" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                        <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                    </svg>
                </div>
            </form>
        </div>
    </div>
</div>
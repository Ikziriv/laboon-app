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
	import { scale } from 'svelte/transition';
	import { session } from '$app/stores';
	import { Reservation } from '$libs/models/Reservation';
	import { deleteDocument, getCollectionStore, saveDocument } from '$libs/utils/firebase';
    // import ReservationItem from '$libs/components/ReservationItem.svelte'
    
	let thisSession: any = $session;
	export let reservationsData: Array<Partial<Reservation>>;
	let reservations = getCollectionStore(
		Reservation,
		'reservations',
		thisSession.user.uid,
		reservationsData.map((t) => new Reservation(t))
	);
    // New Input
	let newRsvName = '';
	let newPhone = '';
	let newText = '';
	let newEmail = '';
	let newRsvCode = '';
    
	async function addReservation() {
		const rsv = new Reservation();
		rsv.uid = (await thisSession).user.uid;
		rsv.rsvName = newRsvName;
		rsv.phone = newPhone;
		rsv.text = newText;
		rsv.email = newEmail;
		rsv.rsvCode = newRsvCode;
		saveDocument(rsv);

		newRsvName = '';
		newPhone = '';
		newText = '';
		newEmail = '';
		newRsvCode = '';
	}
    
	async function updateReservation(rsv: Reservation) {
		saveDocument(rsv);
		if (document.activeElement) {
			(document.activeElement as HTMLElement).blur();
		}
	}
    
	async function toggleComplete(rsv: Reservation) {
		rsv.complete = !rsv.complete;
		saveDocument(rsv);
	}

	async function deleteReservation(rsv: Reservation) {
		rsv.pendingDelete = true;
		deleteDocument(rsv);
	}
</script>

<div class="h-auto w-full bg-gray-100">
    <div class="grid grid-cols-12 gap-0">
        <div class="col-span-full md:col-span-4 bg-white relative border-r">
            
            <div class="absolute inset-y-0 left-0 border-r">
                <div class="w-24 bg-white h-[33rem] flex flex-col justify-between items-center border-l relative">
                    <div class="w-full h-auto flex flex-col">
                        <div class="flex w-full overflow-hidden bg-white my-2">
                            <div class="flex items-center justify-center w-full py-4">
                                <svg class="bi bi-boxes w-6 h-6 text-gray-900 fill-current" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                    <path d="M7.752.066a.5.5 0 0 1 .496 0l3.75 2.143a.5.5 0 0 1 .252.434v3.995l3.498 2A.5.5 0 0 1 16 9.07v4.286a.5.5 0 0 1-.252.434l-3.75 2.143a.5.5 0 0 1-.496 0l-3.502-2-3.502 2.001a.5.5 0 0 1-.496 0l-3.75-2.143A.5.5 0 0 1 0 13.357V9.071a.5.5 0 0 1 .252-.434L3.75 6.638V2.643a.5.5 0 0 1 .252-.434L7.752.066ZM4.25 7.504 1.508 9.071l2.742 1.567 2.742-1.567L4.25 7.504ZM7.5 9.933l-2.75 1.571v3.134l2.75-1.571V9.933Zm1 3.134 2.75 1.571v-3.134L8.5 9.933v3.134Zm.508-3.996 2.742 1.567 2.742-1.567-2.742-1.567-2.742 1.567Zm2.242-2.433V3.504L8.5 5.076V8.21l2.75-1.572ZM7.5 8.21V5.076L4.75 3.504v3.134L7.5 8.21ZM5.258 2.643 8 4.21l2.742-1.567L8 1.076 5.258 2.643ZM15 9.933l-2.75 1.571v3.134L15 13.067V9.933ZM3.75 14.638v-3.134L1 9.933v3.134l2.75 1.571Z"/>
                                </svg>
                            </div>
                        </div>

                    </div>

                    <div class="w-full h-auto flex flex-col">
                        <div class="flex w-full overflow-hidden bg-gray-100 my-2">
                            <div class="flex items-center justify-center w-full py-4">
                                <svg class="bi bi-person-circle w-6 h-6 text-gray-900 fill-current" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                    <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
                                    <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"/>
                                </svg>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
            
            <div class="p-6 mx-auto bg-white pl-32">
                <h2 class="text-lg font-semibold text-gray-700 capitalize">Reservation Input</h2>
                
                <form on:submit|preventDefault={addReservation}>
                    <div class="grid grid-cols-1 gap-2 mt-4">
                        <div>
							<label class="text-xs font-semibold" for="name">Name</label>
                            <input id="rsvName" type="text" bind:value={newRsvName} class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring">
                        </div>

                        <div>
							<label class="text-xs font-semibold" for="phone">Phone</label>
                            <input id="phone" type="text" bind:value={newPhone} class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring">
                        </div>

                        <div>
							<label class="text-xs font-semibold" for="text">Description</label>
                            <input id="text" type="text" bind:value={newText} class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring">
                        </div>

                        <div>
							<label class="text-xs font-semibold" for="email">Email</label>
                            <input id="email" type="email" bind:value={newEmail} class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring">
                        </div>

                        <div>
							<label class="text-xs font-semibold" for="sailboat">Sailboat</label>
                            <input id="rsvCode" type="email" bind:value={newRsvCode} class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring">
                        </div>
                    </div>

                    <div class="flex justify-end mt-6">
                        <button type="submit" class="w-full px-6 py-2 leading-5 text-white transition-colors duration-200 transform bg-gray-700 hover:bg-gray-600 focus:outline-none focus:bg-gray-600">Add Reservation</button>
                    </div>
                </form>
            </div>

        </div>
        <div class="col-span-full md:col-span-8 bg-white relative">
            <div class="w-full h-auto py-3 md:py-6 px-8 border-b md:mb-4">
                <h2 class="text-lg font-semibold text-gray-700 capitalize">Reservation List</h2>
            </div>

            {#if $reservations && $reservations.length}
            <div class="container w-full h-[27rem] mx-auto flex flex-col justify-start items-start px-2 md:px-4">
                
                {#each $reservations as rsvtion (rsvtion._id)}

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
                {/each}
                    
            </div>
            {/if}
        </div>
    </div>
</div>
<script lang="ts">
    import { onMount } from "svelte";
    import { browser } from "$app/env";
	import ReservationItem from './ReservationItem.svelte';
	import { db, getFirestoreClient } from "../../utils/firebase";
    import _ from "lodash";

    import {
        collection,
        onSnapshot,
        doc,
        updateDoc,
        deleteDoc,
        addDoc,
        enableIndexedDbPersistence,
    } from "firebase/firestore";

    let rsvName = "";
    let phone = "";
    let text = "";
    let email = "";
    let rsvCode = "";

    let error = "";

    let reservations = [];
	// Initialising database for realtime update
    const colRef = browser && collection(db, "reservations");
    const unsubscribe =
        browser &&
        onSnapshot(colRef, (querySnapshot) => {
            let firebReservations = [];
            querySnapshot.forEach((doc) => {
                let reservation = { ...doc.data(), id: doc.id };
                firebReservations = [reservation, ...firebReservations];
            });
            console.table(firebReservations);
            reservations = firebReservations;
        });
        
    const addReservation = async () => {
        if (rsvName !== "") {
            const docRef = await addDoc(collection(db, "reservations"), {
                rsvName: rsvName,
                phone: phone,
                text: text,
                email: email,
                rsvCode: rsvCode,
                isComplete: false,
                createdAt: new Date(),
            });

            let rsvName = "";
            let phone = "";
            let text = "";
            let email = "";
            let rsvCode = "";
        } else {
            error = "Reservation name is empty";
        }
    };

    const markTodoAsComplete = async (item: { id: string; isComplete: any; }) => {
        await updateDoc(doc(db, "reservations", item.id), {
            isComplete: !item.isComplete,
        });
    };
    const deleteTodo = async (id: string) => {
        await deleteDoc(doc(db, "reservations", id));
    };
    
    const keyIsPressed = (event: { key: string; }) => {
        if (event.key === "Enter") {
            addReservation();
            console.log("Enter pressed");
        }
    };
    
    $: console.table(reservations);
</script>

<svelte:window on:keydown={keyIsPressed} />
<div class="w-full h-auto md:h-[27rem] mx-auto flex flex-col justify-start items-start px-2 md:px-4 relative overflow-auto border-b">
    
    <!-- <div class="absolute inset-x-0 top-0">
        <div class="flex w-full max-w-sm mx-auto overflow-hidden bg-white rounded-lg shadow-md dark:bg-gray-800">
            <div class="px-4 py-2 -mx-3">
                <div class="mx-3">
                    <span class="font-semibold text-emerald-500 dark:text-emerald-400">Reservation Task Complete</span>
                    <p class="text-sm text-gray-600 dark:text-gray-200">Your awesome dude!</p>
                </div>
            </div>
        </div>
    </div> -->

    <div class="grid grid-cols-2 gap-4 w-full h-auto">
        <div class="col-span-full">
            
            <div class="container flex flex-col mx-auto w-full items-center justify-center">
                <ul class="flex flex-col w-full">
                    {#each reservations as item, index}
                    <li class="border-gray-400 flex flex-row mb-2">
                        <div class="shadow border select-none cursor-pointer bg-white dark:bg-gray-800 rounded-md flex flex-1 items-center p-4">
                            <div class="flex flex-col w-10 h-10 justify-center items-center mr-4">
                                <div class="block relative border shadow p-4 rounded">
                                    <span class="mx-auto object-cover rounded-full h-10 w-10">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-file-earmark dark:text-white" viewBox="0 0 16 16">
                                            <path d="M14 4.5V14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h5.5L14 4.5zm-3 0A1.5 1.5 0 0 1 9.5 3V1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V4.5h-2z"/>
                                        </svg>
                                    </span>
                                </div>
                            </div>
                            <div class="flex-1 pl-1 md:mr-16">
                                <div class="font-medium dark:text-white">
                                    {item.rsvName}
                                </div>
                                <div class="text-gray-600 dark:text-gray-200 text-sm">
                                    {item.phone}
                                </div>
                            </div>
                            <div class="text-gray-600 dark:text-gray-200 text-xs mr-2 md:mr-4">
                                {item.rsvCode}
                            </div>
                            <button class="w-16 text-right flex justify-end rounded-full border shadow py-2 px-2">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-right hover:text-gray-800 dark:hover:text-white dark:text-gray-200 text-blue-500" viewBox="0 0 16 16">
                                    <path fill-rule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"/>
                                </svg>
                            </button>
                        </div>
                    </li>
                    {:else}
                    <li class="border-gray-400 flex flex-row mb-2">
                        <div class="px-4 py-5 sm:px-6 w-full border dark:bg-gray-800 bg-white shadow mb-2 rounded-md">
                            <h3 class="text-lg leading-6 font-medium text-gray-900 dark:text-white">
                                Empty Data
                            </h3>
                            <p class="mt-1 max-w-2xl text-sm text-gray-500 dark:text-gray-200">
                                Please contact web administrator for fix this.
                            </p>
                        </div>
                    </li>
                    {/each}
                </ul>
                <p class="error">{error}</p>
            </div>

        </div>
    </div>
        
</div>
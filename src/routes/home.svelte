<script lang="ts">
	import { goto } from '$app/navigation';
	import { session } from '$app/stores';
	import authStore from '../libs/stores/user';
    import { Reservation, ReservationForm } from '../libs/components/index'
    
	let thisSession: any = $session;
	console.log(thisSession.user);
    
	authStore.subscribe(async ({ isLoggedIn, firebaseControlled }) => {
		if (!isLoggedIn && firebaseControlled) {
			setTimeout(async () => {
				await goto('/');
			}, 1500);
		}
	});
</script>

<div class="h-auto w-full bg-gray-100">
    <div class="grid grid-cols-12 gap-0">
        <div class="col-span-full md:col-span-4 bg-white relative border-r">
            
            <div class="absolute inset-y-0 left-0 border-r">
                <div class="w-24 bg-white h-auto md:h-[33rem] flex flex-col justify-between items-center border-l relative">
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
                
                
                <ReservationForm />
            </div>

        </div>
        <div class="col-span-full md:col-span-8 bg-white relative">
            <div class="w-full h-auto py-3 md:py-6 px-8 border-b md:mb-4">
                <h2 class="text-lg font-semibold text-gray-700 capitalize">Reservation List</h2>
            </div>

            <Reservation />
        </div>
    </div>
</div>
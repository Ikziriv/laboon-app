<script lang="ts">
    import { onMount } from "svelte";
    import _ from "lodash";
	import ReservationItem from './ReservationItem.svelte';
</script>

<div class="container w-full h-auto md:h-[27rem] mx-auto flex flex-col justify-start items-start px-2 md:px-4 relative">
    
    <div class="absolute inset-x-0 top-0">
        <div class="flex w-full max-w-sm mx-auto overflow-hidden bg-white rounded-lg shadow-md dark:bg-gray-800">
            <div class="px-4 py-2 -mx-3">
                <div class="mx-3">
                    <span class="font-semibold text-emerald-500 dark:text-emerald-400">Reservation Task Complete</span>
                    <p class="text-sm text-gray-600 dark:text-gray-200">Your awesome dude!</p>
                </div>
            </div>
        </div>
    </div>

    <div class="grid grid-cols-2 gap-4 w-full h-auto">
        <div class="col-span-full md:col-span-1">
           
        </div>
        <div class="col-span-full md:col-span-1">
            
        </div>
    </div>
        
</div>
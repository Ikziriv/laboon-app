<script lang="ts">
	import AutoComplete from 'simple-svelte-autocomplete';
	import { createEventDispatcher } from 'svelte';
	import countryStore from '../../stores/country-store';
    
	const dispatchEvent = createEventDispatcher();
	export let data: { data: any; };

	$: if ($countryStore) {
		dispatchEvent('selectedCountry', $countryStore.id);
	}
</script>

<div class="flex flex-col align-middle items-start justify-start">
	<p class="mx-2 text-sm font-bold dark:text-white">Countries</p>
	<div>
		{#if data.data}
			<AutoComplete
				items={data.data}
				bind:selectedItem={$countryStore}
				labelFieldName="name"
				placeholder="Select Country"
				className="w-full md:w-80 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm border border-indigo-200 shadow outline-none  focus:outline-none focus:ring mx-2"
			/>
		{/if}
	</div>
</div>
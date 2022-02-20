<script context="module">
	export const prerender = true;
	export async function load({ fetch }) {
		let data = {};
		try {
			// here you should type your dev.to username
			const res = await fetch(`/api/countries.json`);
			data = await res.json();
		} catch (e) {
			console.log(e);
		}
		// you can pass the `articles` via props like that
		return {
			props: {
				data
			}
		};
	}
</script>

<script lang="ts">
	import { onMount } from 'svelte';
	import { page, session } from '$app/stores';
	import { signInWith, signInGoogleWithPopup, signOut} from '../libs/utils/firebase';
	import { MapComponent, CitiesInput, CountriesInput, WeatherComponent } from '../libs/components/index';
	import locationStore from '../libs/stores/location-store';
	import citiesStore from '../libs/stores/cities-store';
	import weatherStore from '../libs/stores/weather-store';

	let thisSession: any;
	$: thisSession = $session;
    
	let map = false;
	let weather = false;
    // Map
    let mapError: string;
	let mapReady: boolean;
	let mapScript: HTMLScriptElement;
	let weatherInCity = {};

	export let data;
    
	const getCities = async (selectedCountry: any) => {
		let data: any;
		try {
			const res = await fetch(`/api/${selectedCountry}.cities.json`);
			data = await res.json();
		} catch (e) {
			console.log(e);
		}
		return data;
	};
    
	const getWeather = async (selectedCity: any) => {
		let data: any;
		try {
			const res = await fetch(`/api/${selectedCity}.weather.json`);
			data = await res.json();
		} catch (e) {
			console.log(e);
		}
		return data;
	};

	function toggleHome() {
		map = false;
		weather = false;
	}
    // Function Map
	function success(position: { coords: { latitude: any; longitude: any; }; }) {
		const lat = position.coords.latitude;
		const lng = position.coords.longitude;
		locationStore.set({ lat, lng });
	}
	function errorFn() {
		mapError = 'Unable to retrieve your location';
	}
	function toggleMap() {
		map = !map;
	}

    // Function Weather
	function toggleWeather() {
		weather = !weather;
	}

	$: console.log($citiesStore);
	let cities;
	$: cities = $citiesStore?.cities ? $citiesStore?.cities : [];

	onMount(() => {
        // Map
		if (typeof window.google === 'undefined') {
			mapScript = document.createElement('script');
			mapScript.setAttribute('src', 'https://maps.googleapis.com/maps/api/js?callback=initMap');
			document.body.appendChild(mapScript);
		} else {
			mapReady = true;
		}
		(window as any).initMap = () => {
			mapReady = true;
		};
	});
</script>

<div class="h-auto md:h-[33rem] w-full bg-gray-100 dark:bg-gray-800">
    <div class="grid grid-cols-12 gap-0">
        <div class="col-span-full md:col-span-4 bg-white dark:bg-gray-800 relative">
            <div class="absolute inset-y-0 right-0 border-r dark:border-gray-100">
                <div class="w-24 bg-white dark:bg-gray-900 h-auto md:h-[33rem] flex flex-col justify-between items-center border-l relative">
                    <div class="w-full h-auto flex flex-col">
                        <div class="flex w-full overflow-hidden bg-white dark:bg-gray-800 my-0">
                            {#if thisSession.user}
                            <div class="flex items-center justify-center w-full py-4 cursor-pointer hover:bg-gray-100 cursor-pointer" on:click={() => signOut()}>
                                <svg class="bi bi-box-arrow-in-left w-6 h-6 text-red-500 fill-current" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                    <path fill-rule="evenodd" d="M10 3.5a.5.5 0 0 0-.5-.5h-8a.5.5 0 0 0-.5.5v9a.5.5 0 0 0 .5.5h8a.5.5 0 0 0 .5-.5v-2a.5.5 0 0 1 1 0v2A1.5 1.5 0 0 1 9.5 14h-8A1.5 1.5 0 0 1 0 12.5v-9A1.5 1.5 0 0 1 1.5 2h8A1.5 1.5 0 0 1 11 3.5v2a.5.5 0 0 1-1 0v-2z"/>
                                    <path fill-rule="evenodd" d="M4.146 8.354a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H14.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3z"/>
                                </svg>
                            </div>
                            {:else}
                            <div class="flex items-center justify-center w-full py-4 cursor-pointer cursor-pointer">
                                <svg class="bi bi-box-arrow-in-right w-6 h-6 text-gray-900 dark:text-white fill-current" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                    <path fill-rule="evenodd" d="M6 3.5a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-2a.5.5 0 0 0-1 0v2A1.5 1.5 0 0 0 6.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-8A1.5 1.5 0 0 0 5 3.5v2a.5.5 0 0 0 1 0v-2z"/>
                                    <path fill-rule="evenodd" d="M11.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H1.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z"/>
                                </svg>
                            </div>
                            {/if}
                        </div>

                    </div>

                    <div class="w-full h-auto flex flex-col">
                        <div class="flex w-full overflow-hidden bg-gray-100 dark:bg-gray-800 my-0 border-t" on:click={() => toggleMap()}>
                            <div class="flex items-center justify-center w-full py-4 cursor-pointer">
                                <svg class="bi bi-compass w-6 h-6 text-gray-900 dark:text-white fill-current" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                    <path d="M8 16.016a7.5 7.5 0 0 0 1.962-14.74A1 1 0 0 0 9 0H7a1 1 0 0 0-.962 1.276A7.5 7.5 0 0 0 8 16.016zm6.5-7.5a6.5 6.5 0 1 1-13 0 6.5 6.5 0 0 1 13 0z"/>
                                    <path d="m6.94 7.44 4.95-2.83-2.83 4.95-4.949 2.83 2.828-4.95z"/>
                                </svg>
                            </div>
                        </div>

                        <div class="flex w-full overflow-hidden bg-gray-100 dark:bg-gray-800 my-0 border-t" on:click={() => toggleWeather()}>
                            <div class="flex items-center justify-center w-full py-4 cursor-pointer">
                                <svg class="bi bi-cloud-drizzle w-6 h-6 text-gray-900 dark:text-white fill-current" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                    <path d="M4.158 12.025a.5.5 0 0 1 .316.633l-.5 1.5a.5.5 0 0 1-.948-.316l.5-1.5a.5.5 0 0 1 .632-.317zm6 0a.5.5 0 0 1 .316.633l-.5 1.5a.5.5 0 0 1-.948-.316l.5-1.5a.5.5 0 0 1 .632-.317zm-3.5 1.5a.5.5 0 0 1 .316.633l-.5 1.5a.5.5 0 0 1-.948-.316l.5-1.5a.5.5 0 0 1 .632-.317zm6 0a.5.5 0 0 1 .316.633l-.5 1.5a.5.5 0 1 1-.948-.316l.5-1.5a.5.5 0 0 1 .632-.317zm.747-8.498a5.001 5.001 0 0 0-9.499-1.004A3.5 3.5 0 1 0 3.5 11H13a3 3 0 0 0 .405-5.973zM8.5 2a4 4 0 0 1 3.976 3.555.5.5 0 0 0 .5.445H13a2 2 0 0 1 0 4H3.5a2.5 2.5 0 1 1 .605-4.926.5.5 0 0 0 .596-.329A4.002 4.002 0 0 1 8.5 2z"/>
                                </svg>
                            </div>
                        </div>
                        
                        <div class="flex w-full overflow-hidden bg-gray-100 dark:bg-gray-800 my-0 border-t" on:click={() => toggleHome()}>
                            <div class="flex items-center justify-center w-full py-4 cursor-pointer">
                                <svg class="bi bi-app-indicator w-6 h-6 text-gray-900 dark:text-white fill-current" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                    <path d="M5.5 2A3.5 3.5 0 0 0 2 5.5v5A3.5 3.5 0 0 0 5.5 14h5a3.5 3.5 0 0 0 3.5-3.5V8a.5.5 0 0 1 1 0v2.5a4.5 4.5 0 0 1-4.5 4.5h-5A4.5 4.5 0 0 1 1 10.5v-5A4.5 4.5 0 0 1 5.5 1H8a.5.5 0 0 1 0 1H5.5z"/>
                                    <path d="M16 3a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
                                </svg>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
            <img class="bg-cover bg-center h-[33rem] w-auto z-0" src="/assets/img/main-bg.jpg" alt="LaboonImage">
        </div>
        
        <div class="col-span-full md:col-span-8 relative">
            {#if map}
            <div class="absolute inset-0 container w-full h-auto bg-white dark:bg-gray-900 flex flex-col z-10">
                
                <div class="flex flex-col justify-center items-center w-full">
                    <div
                        class="py-4 px-4 mb-0 bg-white dark:bg-gray-900 flex-1 w-full flex align-middle items-center justify-between"
                    >
                        <div class="flex flex-col">
                            <h2 class="font-bold align-middle text-gray-800 dark:text-white">
                                Google Map
                            </h2>
                            <small class="text-gray-700 dark:text-gray-100">Your Target Location on Island</small>
                        </div>

                        {#if mapError}<p class="text-xs text-red-500">{mapError}</p>{/if}
                        <button
                            on:click={() => {
                                if (!navigator.geolocation) {
                                    mapError = 'Geolocation is not supported by your browser';
                                } else {
                                    mapError = null;
                                    navigator.geolocation.getCurrentPosition(success, errorFn);
                                }
                            }}
                            class="m-2 w-full inline-flex justify-center shadow-sm px-5 py-3 bg-gray-100 dark:bg-gray-900 text-base font-medium text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 dark:focus:ring-gray-400 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm capitalize"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                class="h-5 w-5 fill-current"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                            >
                                <path
                                    fill-rule="evenodd"
                                    d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                                    clip-rule="evenodd"
                                />
                            </svg>
                        </button>
                    </div>

                    <div class="flex-1 w-full">
                        {#if mapReady}
                            <MapComponent />
                        {/if}
                    </div>
                </div>
                    
            </div>
            {/if}
            
            {#if weather}
            <div class="absolute inset-0 container w-full h-auto bg-white dark:bg-gray-900 flex flex-col z-0">
                <div class="w-full h-auto md:h-[33rem] flex justify-center items-center">
                    <div class="flex justify-center align-middle items-center">
                        <div
                            class="p-4 m-2 border border-gray-200 dark:border-gray-500 rounded shadow bg-white dark:bg-gray-600"
                        >
                            <h1 class="p-2 font-bold text-gray-700 dark:text-white">City Weather</h1>
                            <div class="flex flex-wrap gap-2">
                                <CountriesInput
                                    {data}
                                    on:selectedCountry={async (e) => {
                                        if (e.detail === $citiesStore?.countryCode) {
                                            return;
                                        }
                                        citiesStore.set({ countryCode: e.detail, cities: null });
                                        weatherStore.update((state) => {
                                            state.loading = false;
                                            state.result = null;
                                            return state;
                                        });
                                        let data = await getCities(e.detail);
                                        console.log(data);
                                        citiesStore.set({ countryCode: e.detail, cities: data.cities });
                                    }}
                                />
                                <CitiesInput
                                    data={cities}
                                    on:selectedCity={async (e) => {
                                        weatherStore.update((state) => {
                                            state.loading = true;
                                            return state;
                                        });
                                        weatherInCity = await getWeather(e.detail);
                                        weatherStore.update((state) => {
                                            state.loading = false;
                                            state.result = weatherInCity;
                                            return state;
                                        });
                                    }}
                                />
                            </div>
                            <div class="flex">
                                <WeatherComponent />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/if}

            {#if thisSession.user}
            <div class="container w-full h-auto md:h-[33rem] mx-auto flex flex-col justify-end md:justify-center items-end md:items-center">
                
                <a sveltekit:prefetch href="/home" class="flex w-full max-w-sm mx-auto overflow-hidden bg-white dark:bg-gray-900 rounded-lg shadow-md my-2">
                    <div class="flex items-center justify-center w-16 border-r dark:border-gray-100">
                        <svg class="bi bi-person-circle w-6 h-6 text-gray-900 dark:text-white fill-current" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                            <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
                            <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"/>
                        </svg>
                    </div>
                    
                    <div class="px-4 py-2 -mx-3">
                        <div class="mx-3">
                            <span class="font-bold text-gray-900 dark:text-white">{thisSession.user.name}</span>
                            <p class="text-sm text-gray-700 dark:text-gray-300">Go to your account</p>
                        </div>
                    </div>
                </a>
                    
            </div>
            {:else}
            <div class="container w-full h-auto md:h-[33rem] mx-auto flex flex-col justify-end md:justify-center items-end md:items-center">
                
                <button class="flex w-full max-w-sm mx-auto overflow-hidden bg-white dark:bg-gray-900 rounded-lg border border-green-500 shadow-md my-2" on:click={() => signInGoogleWithPopup()}>
                    <div class="flex items-center justify-center h-16 w-16 border-r dark:border-gray-100">
                        <svg class="bi bi-google w-6 h-6 text-gray-900 dark:text-white fill-current" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                            <path d="M15.545 6.558a9.42 9.42 0 0 1 .139 1.626c0 2.434-.87 4.492-2.384 5.885h.002C11.978 15.292 10.158 16 8 16A8 8 0 1 1 8 0a7.689 7.689 0 0 1 5.352 2.082l-2.284 2.284A4.347 4.347 0 0 0 8 3.166c-2.087 0-3.86 1.408-4.492 3.304a4.792 4.792 0 0 0 0 3.063h.003c.635 1.893 2.405 3.301 4.492 3.301 1.078 0 2.004-.276 2.722-.764h-.003a3.702 3.702 0 0 0 1.599-2.431H8v-3.08h7.545z"/>
                        </svg>
                    </div>
                    
                    <div class="px-4 py-2 -mx-3">
                        <div class="mx-3 text-left">
                            <span class="font-bold text-gray-900 dark:text-white">Google</span>
                            <p class="text-sm text-gray-700 dark:text-gray-300">Autentication with google account</p>
                        </div>
                    </div>
                </button>

                <button class="flex w-full max-w-sm mx-auto overflow-hidden bg-white dark:bg-gray-900 rounded-lg shadow-md my-2">
                    <div class="flex items-center justify-center h-16 w-16 border-r dark:border-gray-100">
                        <svg class="bi bi-facebook w-6 h-6 text-gray-900 dark:text-white fill-current" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                            <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z"/>
                        </svg>
                    </div>
                    
                    <div class="px-4 py-2 -mx-3">
                        <div class="mx-3 text-left">
                            <span class="font-bold text-gray-900 dark:text-white">Facebook</span>
                            <p class="text-sm text-gray-700 dark:text-gray-300">Autentication with facebook account</p>
                        </div>
                    </div>
                </button>
                
                <button class="flex w-full max-w-sm mx-auto overflow-hidden bg-white dark:bg-gray-900 hover:bg-gray-100 rounded-lg shadow-md my-2">
                    <div class="flex items-center justify-center h-16 w-16 border-r dark:border-gray-100">
                        <svg class="bi bi-github w-6 h-6 text-gray-900 dark:text-white fill-current" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                            <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z"/>
                        </svg>
                    </div>
                    
                    <div class="px-4 py-2 -mx-3">
                        <div class="mx-3 text-left">
                            <span class="font-bold text-gray-900 dark:text-white">Github</span>
                            <p class="text-sm text-gray-700 dark:text-gray-300">Autentication with github account</p>
                        </div>
                    </div>
                </button>
                    
            </div>
            {/if}
        </div>

    </div>
</div>
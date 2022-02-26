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
	import { slide } from 'svelte/transition';
    import { getAuth } from 'firebase/auth';
	import { signInGoogleWithPopup, signOut} from '../libs/utils/auth';
	import locationStore from '../libs/stores/location-store';
	import citiesStore from '../libs/stores/cities-store';
	import weatherStore from '../libs/stores/weather-store';
    
	import { 
        MapComponent, 
        CitiesInput, 
        CountriesInput, 
        WeatherComponent, 
		AboutComponent,
		FaqComponent,
        ChatArea, 
        RoomSetting 
    } from '../libs/components/index';

	let thisSession: any;
	$: thisSession = $session;
    
	let chat = false;
	let map = false;
	let weather = false;
    let isInRoom = false;
    // Map
    let mapError: string;
	let mapReady: boolean;
	let mapScript: HTMLScriptElement;
	let weatherInCity = {};

    const auth = getAuth();
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
		chat = false;
		map = false;
		weather = false;
	}
    // Function Chat
	function toggleChat() {
		chat = !chat;
		map = false;
		weather = false;
	}
    function handleUserInRoom(e) {
        isInRoom = e.detail.isInRoom;
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
		chat = false;
		map = !map;
		weather = false;
	}

    // Function Weather
	function toggleWeather() {
		chat = false;
		map = false;
		weather = !weather;
	}

	$: console.log($citiesStore);
	let cities;
	$: cities = $citiesStore?.cities ? $citiesStore?.cities : [];

	onMount(async () => {
        // Map
		// @ts-ignore
		if (typeof window.google === 'undefined') {
			mapScript = document.createElement('script');
			mapScript.setAttribute('src', 'https://maps.googleapis.com/maps/api/js?key=AIzaSyBk52yhco1B_HJtZEcu1DvSNhEKj5AFKlY&callback=initMap');
			document.body.appendChild(mapScript);
		} else {
			mapReady = true;
		}
		(window as any).initMap = () => {
			mapReady = true;
		};
	});
</script>

<svelte:head>
	<title>Laboon | Welcome</title>
</svelte:head>

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
                        {#if thisSession.user}
                            <div class="flex w-full overflow-hidden bg-gray-100 dark:bg-gray-800 my-0 border-t" on:click={() => toggleChat()}>
                                <div class="flex items-center justify-center w-full py-4 cursor-pointer">
                                    <svg class="bi bi-chat w-6 h-6 text-gray-900 dark:text-white fill-current" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                        <path d="M2.678 11.894a1 1 0 0 1 .287.801 10.97 10.97 0 0 1-.398 2c1.395-.323 2.247-.697 2.634-.893a1 1 0 0 1 .71-.074A8.06 8.06 0 0 0 8 14c3.996 0 7-2.807 7-6 0-3.192-3.004-6-7-6S1 4.808 1 8c0 1.468.617 2.83 1.678 3.894zm-.493 3.905a21.682 21.682 0 0 1-.713.129c-.2.032-.352-.176-.273-.362a9.68 9.68 0 0 0 .244-.637l.003-.01c.248-.72.45-1.548.524-2.319C.743 11.37 0 9.76 0 8c0-3.866 3.582-7 8-7s8 3.134 8 7-3.582 7-8 7a9.06 9.06 0 0 1-2.347-.306c-.52.263-1.639.742-3.468 1.105z"/>
                                    </svg>
                                </div>
                            </div>
                        {/if}

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
            <!-- Components -->
            <AboutComponent  />
            <FaqComponent />

            {#if chat}
            <div transition:slide class="absolute inset-0 container w-full h-auto bg-white dark:bg-gray-900 flex flex-col z-20">
                
                <div class="flex flex-col justify-center items-center w-full">
                    <div
                        class="py-4 px-4 mb-0 bg-white dark:bg-gray-900 flex-1 w-full flex align-middle items-center justify-between border-b"
                    >
                        <div class="flex flex-col">
                            <h2 class="font-bold align-middle text-gray-800 dark:text-white">
                                Laboon Chat
                            </h2>
                            <small class="text-gray-700 dark:text-gray-100">Chit chat about your journey on Island</small>
                        </div>

                        <button
                            class="m-2 w-full inline-flex justify-center shadow-sm px-5 py-3 bg-gray-100 dark:bg-gray-900 text-base font-medium text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 dark:focus:ring-gray-400 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm capitalize"
                        >
                            <svg class="bi bi-gear fill-current" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                <path d="M8 4.754a3.246 3.246 0 1 0 0 6.492 3.246 3.246 0 0 0 0-6.492zM5.754 8a2.246 2.246 0 1 1 4.492 0 2.246 2.246 0 0 1-4.492 0z"/>
                                <path d="M9.796 1.343c-.527-1.79-3.065-1.79-3.592 0l-.094.319a.873.873 0 0 1-1.255.52l-.292-.16c-1.64-.892-3.433.902-2.54 2.541l.159.292a.873.873 0 0 1-.52 1.255l-.319.094c-1.79.527-1.79 3.065 0 3.592l.319.094a.873.873 0 0 1 .52 1.255l-.16.292c-.892 1.64.901 3.434 2.541 2.54l.292-.159a.873.873 0 0 1 1.255.52l.094.319c.527 1.79 3.065 1.79 3.592 0l.094-.319a.873.873 0 0 1 1.255-.52l.292.16c1.64.893 3.434-.902 2.54-2.541l-.159-.292a.873.873 0 0 1 .52-1.255l.319-.094c1.79-.527 1.79-3.065 0-3.592l-.319-.094a.873.873 0 0 1-.52-1.255l.16-.292c.893-1.64-.902-3.433-2.541-2.54l-.292.159a.873.873 0 0 1-1.255-.52l-.094-.319zm-2.633.283c.246-.835 1.428-.835 1.674 0l.094.319a1.873 1.873 0 0 0 2.693 1.115l.291-.16c.764-.415 1.6.42 1.184 1.185l-.159.292a1.873 1.873 0 0 0 1.116 2.692l.318.094c.835.246.835 1.428 0 1.674l-.319.094a1.873 1.873 0 0 0-1.115 2.693l.16.291c.415.764-.42 1.6-1.185 1.184l-.291-.159a1.873 1.873 0 0 0-2.693 1.116l-.094.318c-.246.835-1.428.835-1.674 0l-.094-.319a1.873 1.873 0 0 0-2.692-1.115l-.292.16c-.764.415-1.6-.42-1.184-1.185l.159-.291A1.873 1.873 0 0 0 1.945 8.93l-.319-.094c-.835-.246-.835-1.428 0-1.674l.319-.094A1.873 1.873 0 0 0 3.06 4.377l-.16-.292c-.415-.764.42-1.6 1.185-1.184l.292.159a1.873 1.873 0 0 0 2.692-1.115l.094-.319z"/>
                            </svg>
                        </button>
                    </div>

                    <div class="flex-1 w-full h-auto md:h-[33rem]">
                        <div class="grid grid-cols-4 gap-4">
                            <div class="col-span-full md:col-span-3">
                                <ChatArea {isInRoom} />
                            </div>
                            <div class="col-span-full md:col-span-1 bg-gray-100">
                                <RoomSetting on:user-in-room={handleUserInRoom}/>
                            </div>
                        </div>
                    </div>
                </div>
                    
            </div>
            {/if}

            {#if map}
            <div transition:slide class="absolute inset-0 container w-full h-auto bg-white dark:bg-gray-900 flex flex-col z-10">
                
                <div class="flex flex-col justify-center items-center w-full">
                    <div
                        class="py-4 px-4 mb-0 bg-white dark:bg-gray-900 flex-1 w-full flex align-middle items-center justify-between"
                    >
                        <div class="flex flex-col">
                            <h2 class="font-bold align-middle text-gray-800 dark:text-white">
                                Laboon Map
                            </h2>
                            <small class="text-gray-700 dark:text-gray-100">Your Target Location on Island</small>
                        </div>

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
                        {#if mapError}<p class="text-xs text-red-500">{mapError}</p>{/if}
                        {#if mapReady}
                            <MapComponent />
                        {/if}
                    </div>
                </div>
                    
            </div>
            {/if}
            
            {#if weather}
            <div transition:slide class="absolute inset-0 container w-full h-auto bg-white dark:bg-gray-900 flex flex-col z-0">
                <div class="w-full h-auto md:h-[33rem] flex flex-col justify-between items-center">
                    <div class="flex flex-col justify-center items-center">
                        <div
                            class="flex md:flex-row border-b bg-white dark:bg-gray-600 py-4 px-4"
                        >
                            <div class="flex flex-col mr-8">
                                <h1 class="font-bold text-gray-700 dark:text-white">Laboon Weather</h1>
                                <small class="text-gray-700 dark:text-gray-100">Check your weather Location</small>
                            </div>
                            <div class="flex flex-row py-0">
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
                        </div>
                        <div class="flex flex-col">
                            <WeatherComponent />
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
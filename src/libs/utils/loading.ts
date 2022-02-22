import { writable } from 'svelte/store';

const newLoading = () => {
    const { subscribe, update, set } = writable({
        status: 'IDEL', // IDLE, LOADING, NAVIGATING
        message: ''
    })

    function setNavigate(isNavigating: boolean) {
        update(() => {
            return {
                status: isNavigating ? 'NAVIGATING' : 'IDLE',
                message: ''
            }
        })
    }
    return { subscribe, update, set, setNavigate };
}

export const loading = newLoading();
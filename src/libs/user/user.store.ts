import { readable } from 'svelte/store'
import { auth } from '$libs/supabase'
import { setServerSessionAndRedir } from '$libs/user'

export const user = readable(auth.user(), set => {
    auth.onAuthStateChange((event, session) => {
        if (event == 'SIGNED_IN') {
            set(session.user)
            setServerSessionAndRedir(session)
        }
        if (event == 'SIGNED_OUT') {
            set(null)
        }
    })
})
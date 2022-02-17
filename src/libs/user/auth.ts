import type{ AuthSession } from '@supabase/supabase-js'
import { goto } from '$app/navigation';
import { auth } from '$libs/supabase'
import { setAuthCookie, unsetAuthCookie } from '$libs/utils'
import { ROUTE_HOME, ROUTE_PROFILE } from '$libs/const'

export async function signOut() {
    await auth.signOut()
    await unsetAuthCookie()
    goto(ROUTE_HOME)
}

export async function setServerSessionAndRedir(session: AuthSession) {
    await setAuthCookie(session)
    goto(ROUTE_PROFILE)
}
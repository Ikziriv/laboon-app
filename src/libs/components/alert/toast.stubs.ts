/*
 *	This functon stubs are imported by components
 *	that need to show a Toast notification.
 */
 import { toast } from '@zerodevx/svelte-toast';
 import type { SvelteToastOptions } from '@zerodevx/svelte-toast';
 
 const toastTheme = {
   '--toastContainerTop': '0',
   '--toastContainerRight': '0',
   '--toastContainerBottom': '0',
   '--toastContainerLeft': '0',
   '--toastWidth': 'auto',
   '--toastHeight': 'auto',
   '--toastMargin': '0 0 0 0',
   '--toastColor': 'rgba(0, 0, 0, 0)',
   '--toastBackground': 'rgba(0, 0, 0, 0)',
   '--toastMsgPadding': '0 0',
   '--toastBoxShadow': '',
 };
 
 export /**
  * Shows a notification as a toast
  *
  * @param {SvelteToastOptions} props
  * @return {*}  {number}
  */
 const showToast = (props: SvelteToastOptions): number => {
   return toast.push({
     ...props,
     theme: toastTheme,
   });
 };
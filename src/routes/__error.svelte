<script context="module">
	export function load({ error, status }) {
		return {
			props: {
                error,
                status
            }
		};
	}
</script>

<script>
	import { dev } from '$app/env';
	export let error, status;
</script>

<div class="col-md-9">
	<h1>{status}</h1>

	<p>{error.message}</p>

	{#if dev && error.stack}
		<pre>{error.stack}</pre>
	{/if}
</div>

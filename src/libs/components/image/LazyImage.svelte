<script lang="ts">
	import { lazyLoad } from '../../../libs/utils/lazyload';
	export let classes = '';
	export let src = '';
	export let alt = '';
</script>

<img class="{classes}" src={src} use:lazyLoad={src} {alt} />
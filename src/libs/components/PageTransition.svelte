<script>
    import { fade, fly } from 'svelte/transition';
</script>

<div
    in:fade="{{ duration: 250, delay: 100 }}"
    out:fly="{{ y: 80, duration: 100 }}"
    class="scrollbar-hide"
>
    <slot />
</div>
<script lang="ts">
    import {loading} from '../utils/loading'

    $: if($loading.status === 'NAVIGATING') {
        setTimeout(() => {
            if($loading.status === 'NAVIGATING'){
                $loading.status = 'LOADING'
            }
        })
    }
</script>

{#if $loading.status = 'LOADING'}
<div class="loading-container fixed bg-transparent w-full h-screen">
    <div class="flex justify-center items-center">
        <div class="lds-ripple w-auto h-auto">
            <div />
            <div />
          </div>
    </div>
</div>
{/if}

<style>
    .loading-container{
        z-index: 999999999;
    }
    .lds-ripple {
        display: inline-block;
        position: relative;
        width: 80px;
        height: 80px;
    }
    .lds-ripple div {
        position: absolute;
        border: 4px solid var(--color-purple-500);
        opacity: 1;
        border-radius: 50%;
        animation: lds-ripple 1s cubic-bezier(0, 0.2, 0.8, 1) infinite;
    }
    .lds-ripple div:nth-child(2) {
        animation-delay: -0.5s;
    }
    @keyframes lds-ripple {
        0% {
            top: 36px;
            left: 36px;
            width: 0;
            height: 0;
            opacity: 1;
        }
        100% {
            top: 0px;
            left: 0px;
            width: 72px;
            height: 72px;
            opacity: 0;
        }
    }
</style>
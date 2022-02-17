<script>
    import Header from "../libs/components/Header.svelte"
    import Footer from "../libs/components/Footer.svelte"
	import '../styles/css/app.css';
</script>
<div class="w-full h-screen relative">
    <Header classes="fixed inset-x-0 top-0" />
    <main class="w-full h-auto relative">
        <slot />
    </main>
    <Footer classes="fixed inset-x-0 bottom-0" />
</div>
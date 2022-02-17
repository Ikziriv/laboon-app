import sveltePreprocess from 'svelte-preprocess';
import adapter from '@sveltejs/adapter-auto';
import path from "path";

/** @type {import('@sveltejs/kit').Config} */
const config = {
    preprocess: sveltePreprocess({
        postcss: true,
    }),
    kit: {
        adapter: adapter(),
        vite: () => ({
            resolve: {
                $components: path.resolve('src/libs/components'),
                $styles: path.resolve('src/styles'),
                $libs: path.resolve('src/libs')
            },
            plugins: [],
        })
    }
};

export default config;
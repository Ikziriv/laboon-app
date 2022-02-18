import sveltePreprocess from 'svelte-preprocess';
import adapterVercel from '@sveltejs/adapter-vercel';
// import adapterAuto from '@sveltejs/adapter-auto';
import path from "path";

/** @type {import('@sveltejs/kit').Config} */
const config = {
    preprocess: sveltePreprocess({
        postcss: true,
    }),
    kit: {
        adapter: adapterVercel(),
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
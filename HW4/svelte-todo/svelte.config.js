import adapter from '@sveltejs/adapter-static';

/** u/type {import('@sveltejs/kit').Config} */
const config = {
    kit: {
        adapter: adapter({
            pages: 'public',
            assets: 'public',
            fallback: 'index.html',
            precompress: false
        }),
    }
}
export default config;
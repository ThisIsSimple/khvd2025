import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
	plugins: [tailwindcss(), sveltekit()],
	server: {
		allowedHosts: ['khvd.kr', '2025.khvd.kr', 'dfbc1efd509a.ngrok-free.app']
	},
	build: {
		target: ['es2015', 'safari11']
	}
});

import react from '@vitejs/plugin-react-swc';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig(() => {
	return {
		base: '/',
		plugins: [react()],
		server: {
			host: true, // This makes the server listen on all network interfaces
			port: 5173,
		},
	};
});

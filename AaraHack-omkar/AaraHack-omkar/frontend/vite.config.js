import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  assetsInclude: ['**/*.glb', '**/*.usdz'],
  server: {
    allowedHosts: ['6c17-2401-4900-188d-dc9d-84a2-3df4-a3cd-ab19.ngrok-free.app'],
  },
})

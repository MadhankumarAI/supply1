import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: ['babel-plugin-react-compiler'], // only babel plugins here
      },
    }),
    tailwindcss(), // ✅ move here
  ],
  server: {
    host: '0.0.0.0',
    port: 3000,
    allowedHosts: [
      'localhost',
      '.preview.emergentagent.com',
      '.emergentagent.com',
      '.preview.emergentcf.cloud',
      '.emergentcf.cloud',
      'supplychain-ui.cluster-12.preview.emergentcf.cloud'
    ]
  }
})

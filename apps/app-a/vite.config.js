import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [react()],
  resolve: {
    // FIX step 2 (bundler dedupe) — uncomment to apply.
    // Forces every `import 'react'` / 'react-dom' (including the ones inside
    // packages/ui) to resolve from THIS app's root, so only one React exists.
    // App A happens to work without it (its React version matches the copy
    // npm hoisted), but apply it here too so A doesn't break when hoisting shifts.
    //
    // dedupe: ['react', 'react-dom'],
  },
  test: {
    environment: 'jsdom',
  },
})

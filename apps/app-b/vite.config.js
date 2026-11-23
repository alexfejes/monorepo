import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react()],
  resolve: {
    // FIX step 2 (bundler dedupe) — uncomment to apply.
    // Without this, `import 'react'` inside packages/ui resolves by walking up
    // from packages/ui/ -> <root>/node_modules/react (18.3.1, hoisted by npm),
    // while this app's own code + react-dom resolve apps/app-b/node_modules/react
    // (19.3.1). react-dom 19 sets the hook dispatcher on ITS React; the hooks
    // in @demo/ui read the dispatcher from the OTHER React -> null -> crash.
    // dedupe makes Vite resolve these packages from this app's root for every
    // importer, so the bundle (and Vitest) contains exactly one React.
    //
    // dedupe: ['react', 'react-dom'],
  },
  test: {
    environment: "jsdom",
  },
});

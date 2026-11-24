import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [
    react(),
    // TEMP REGRESSION: build-only, sends @demo/ui's react imports to the root React 18
    // { name: "regress", apply: "build", enforce: "pre",
    //   resolveId: async (id, from) => from?.includes("packages") && /^react(\/|$)/.test(id)
    //     ? (await import("node:module")).createRequire(new URL("../../", import.meta.url)).resolve(id) : null },
  ],
  resolve: {
    dedupe: ["react", "react-dom"],
  },
  test: {
    environment: "jsdom",
  },
});

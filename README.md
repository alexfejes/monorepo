# Shared hooks / duplicate React — tutorial monorepo

```
packages/ui     @demo/ui — Counter + useCounter hook (do not edit hook logic)
apps/app-a      React 18.3.1 consumer  (dev :5176, preview :4176)
apps/app-b      React 19.3.1 consumer  (dev :5175, preview :4175)
```

## 1. Baseline (broken)

```sh
npm install
npm run why-react          # two React copies: <root>/node_modules (18) + apps/app-b/node_modules (19)
npm run build:a && npm run test:a   # pass
npm run build:b && npm run test:b   # build "passes" (bundle ~228 kB, two Reacts); tests FAIL
npm run preview:b          # http://localhost:4175 -> "two Reacts loaded" + useState of null
```

Note: `npm run dev:b` looks fine. Vite's dev pre-bundler (optimizeDeps) dedupes React
by accident, which is why the failure looks intermittent. Production builds and Vitest don't.

## 2. Fix (configs only)

1. `packages/ui/package.json`: delete `dependencies`, rename `//peerDependencies` -> `peerDependencies`, then `npm install`.
2. `apps/app-a/vite.config.js` and `apps/app-b/vite.config.js`: uncomment `dedupe: ['react', 'react-dom']`.

Step 2 is the one that matters. Step 1 by itself still fails app-b, because workspace symlinks
make `packages/ui` resolve `react` from `<root>/node_modules`.

## 3. Verify

```sh
npm run check              # both builds + both test suites green; app-b bundle ~221 kB
npm run preview:b          # restart, then reload :4175 -> single React, counter increments
```

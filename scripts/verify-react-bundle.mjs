import { readdirSync, readFileSync } from 'node:fs'

for (const app of ['app-a', 'app-b']) {
  const dir = `apps/${app}/dist/assets/`
  const code = readdirSync(dir).map((f) => readFileSync(dir + f, 'utf8')).join()
  const hooks = code.match(/(H|current)\.use\w+/g).map((h) => h.split('.').pop())
  const dupes = hooks.length - new Set(hooks).size
  console.log(app, dupes ? `BAD: ${dupes} hooks served by two Reacts` : 'ok')
  if (dupes) process.exitCode = 1
}

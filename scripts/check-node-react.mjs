import { createRequire } from 'node:module'

for (const app of ['app-a', 'app-b']) {
  const req = createRequire(`${process.cwd()}/apps/${app}/`)
  const react = req.resolve('react')
  const domReact = createRequire(req.resolve('react-dom')).resolve('react')
  console.log(app, react, react === domReact ? 'ok' : 'BAD')
  if (react !== domReact) process.exitCode = 1
}

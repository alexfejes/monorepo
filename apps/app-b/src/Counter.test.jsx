import { act, version as appReactVersion } from 'react'
import { createRoot } from 'react-dom/client'
import { afterEach, expect, test } from 'vitest'
import { Counter, uiReactVersion } from '@demo/ui'

globalThis.IS_REACT_ACT_ENVIRONMENT = true

let root
let container
afterEach(() => {
  act(() => root?.unmount())
  container?.remove()
})

test('@demo/ui resolves the same React as the app', () => {
  expect(uiReactVersion).toBe(appReactVersion)
})

test('Counter hook state updates on click', () => {
  container = document.createElement('div')
  document.body.append(container)
  root = createRoot(container)

  act(() => root.render(<Counter />))
  const count = () => container.querySelector('[data-testid="count"]').textContent
  expect(count()).toBe('0')

  act(() => container.querySelector('button').click())
  expect(count()).toBe('1')
})

import { useCounter } from './useCounter.js'

export function Counter({ label = 'Shared counter', initial = 0 }) {
  const { count, lastChanged, increment, reset } = useCounter(initial)

  return (
    <div className="ui-counter">
      <h2>{label}</h2>
      <p>
        Count: <strong data-testid="count">{count}</strong>
      </p>
      <p className="muted">Last changed: {lastChanged ?? '—'}</p>
      <button type="button" onClick={increment}>
        +1
      </button>{' '}
      <button type="button" onClick={reset}>
        Reset
      </button>
    </div>
  )
}

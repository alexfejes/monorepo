import { Component, version as appReactVersion } from 'react'
import { Counter, uiReactVersion } from '@demo/ui'

const APP_NAME = 'App B'

class ErrorBoundary extends Component {
  state = { error: null }
  static getDerivedStateFromError(error) {
    return { error }
  }
  render() {
    if (this.state.error) {
      return (
        <pre style={{ color: '#b00020', whiteSpace: 'pre-wrap' }}>
          Hook failure in @demo/ui:{'\n'}
          {String(this.state.error)}
        </pre>
      )
    }
    return this.props.children
  }
}

export default function App() {
  const same = appReactVersion === uiReactVersion
  return (
    <main style={{ fontFamily: 'system-ui, sans-serif', padding: 24 }}>
      <h1>{APP_NAME}</h1>
      <p>
        App React: <code>{appReactVersion}</code> · @demo/ui React:{' '}
        <code>{uiReactVersion}</code>{' '}
        <strong style={{ color: same ? 'green' : '#b00020' }}>
          {same ? '✔ single React' : '✘ two Reacts loaded'}
        </strong>
      </p>
      <ErrorBoundary>
        <Counter label={`${APP_NAME} counter`} />
      </ErrorBoundary>
    </main>
  )
}

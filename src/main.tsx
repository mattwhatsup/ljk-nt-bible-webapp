import React, { Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import App from './App'
import { store } from './app/store'
import { Provider as ChakraProvider } from '@/components/ui/provider'
import { BrowserRouter as Router } from 'react-router-dom'
import './index.css'
import ErrorBoundary from './components/ErrorBoundary'

const container = document.getElementById('root')

if (container) {
  const root = createRoot(container)

  root.render(
    <React.StrictMode>
      <Router
        basename={process.env.NODE_ENV === 'gh' ? '/ljk-nt-bible-webapp/' : '/'}
      >
        <Provider store={store}>
          <ChakraProvider>
            <ErrorBoundary>
              <Suspense fallback={<div>Error...</div>}>
                <App />
              </Suspense>
            </ErrorBoundary>
          </ChakraProvider>
        </Provider>
      </Router>
    </React.StrictMode>,
  )
} else {
  throw new Error(
    "Root element with ID 'root' was not found in the document. Ensure there is a corresponding HTML element with the ID 'root' in your HTML file.",
  )
}

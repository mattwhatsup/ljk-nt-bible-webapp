// RouteHistoryContext.tsx
import { createContext, useContext, useEffect, useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

interface RouteHistoryContextValue {
  current: string
  previous: string | null
  navigate: ReturnType<typeof useNavigate>
}

const RouteHistoryContext = createContext<RouteHistoryContextValue | null>(null)

export const RouteHistoryProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const location = useLocation()
  const navigate = useNavigate()

  const [current, setCurrent] = useState(location.pathname)
  const previousRef = useRef<string | null>(null)

  useEffect(() => {
    previousRef.current = current
    setCurrent(location.pathname)
  }, [location.pathname])

  return (
    <RouteHistoryContext.Provider
      value={{
        current,
        previous: previousRef.current,
        navigate,
      }}
    >
      {children}
    </RouteHistoryContext.Provider>
  )
}

export function useRouteHistory() {
  const context = useContext(RouteHistoryContext)
  if (!context) {
    throw new Error('useRouteHistory must be used within RouteHistoryProvider')
  }
  return context
}

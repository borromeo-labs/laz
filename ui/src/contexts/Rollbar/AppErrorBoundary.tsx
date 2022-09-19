import React from 'react'
import { ErrorBoundary } from '@rollbar/react'

const FallbackComponent: React.FC<{}> = () => {
  return <div>Error, please refresh the page.</div>
}

const AppErrorBoundary: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <ErrorBoundary fallbackUI={<FallbackComponent />}>{children}</ErrorBoundary>
}

export { AppErrorBoundary }

import { Provider } from '@rollbar/react'
import { config } from '@/config'
import React from 'react'

const RollbarProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const rollbarConfig = {
    accessToken: config.rollbar.token,
    captureUncaught: true,
    captureUnhandledRejections: true,
    payload: {
      environment: config.rollbar.env,
      client: {
        javascript: {
          code_version: '1.0.0',
          source_map_enabled: true,
        },
      },
    },
  }

  return <Provider config={rollbarConfig}>{children}</Provider>
}

export { RollbarProvider }

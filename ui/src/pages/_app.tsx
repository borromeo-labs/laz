import '@/styles/globals.css'

import { useState } from 'react'
import { QueryClientProvider, QueryClient } from 'react-query'

function App({ Component, pageProps }) {
  const [client] = useState(() => new QueryClient())

  return (
    <QueryClientProvider client={client}>
      <Component {...pageProps} />
    </QueryClientProvider>
  )
}

export default App

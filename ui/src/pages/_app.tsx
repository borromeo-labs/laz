import '@/styles/globals.css'
import { useState } from 'react'
import { QueryClientProvider, QueryClient } from 'react-query'

const DEFAULT_LAYOUT = (page: React.ReactNode) => page

function App({ Component, pageProps }) {
  const [client] = useState(() => new QueryClient())
  const getLayout = Component.getLayout || DEFAULT_LAYOUT
  return <QueryClientProvider client={client}>{getLayout(<Component {...pageProps} />)}</QueryClientProvider>
}

export default App

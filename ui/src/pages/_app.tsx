import '@/styles/globals.css'
import { useState } from 'react'
import { QueryClientProvider, QueryClient } from 'react-query'
import { SessionProvider } from 'next-auth/react'
import { ExpenseMonthProvider } from '@/page-components/ExpenseMonth'

const DEFAULT_LAYOUT = (page: React.ReactNode) => page

function App({ Component, pageProps }) {
  const [client] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnMount: false,
            refetchOnWindowFocus: false,
            refetchOnReconnect: false
          }
        }
      })
  )

  const getLayout = Component.getLayout || DEFAULT_LAYOUT

  return (
    <SessionProvider session={pageProps.session}>
      <QueryClientProvider client={client}>
        <ExpenseMonthProvider>{getLayout(<Component {...pageProps} />)}</ExpenseMonthProvider>
      </QueryClientProvider>
    </SessionProvider>
  )
}

export default App

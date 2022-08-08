import '@/styles/globals.css'
import Head from 'next/head'
import { useState } from 'react'
import { QueryClientProvider, QueryClient } from 'react-query'
import { SessionProvider } from 'next-auth/react'
import { AxiosProvider } from '@/contexts/Axios'
import { ExpenseMonthProvider } from '@/page-components/ExpenseMonth'
import { config } from '@/config'

const DEFAULT_LAYOUT = (page: React.ReactNode) => page

function App({ Component, pageProps }) {
  const [client] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnMount: false,
            refetchOnWindowFocus: false,
            refetchOnReconnect: false,
          },
        },
      }),
  )

  const getLayout = Component.getLayout || DEFAULT_LAYOUT

  const favicon = process.env.NODE_ENV === 'production' ? '/favicon.png?v=2' : '/favicon-dev.png?v=2'

  return (
    <>
      <Head>
        <title>{config.app.title}</title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
        <meta content={config.app.tagline} name="description" />
        <meta content={config.app.title} property="og:title" />
        <meta content={config.app.tagline} property="og:description" />
        <meta content="/thumbnail.png" property="og:image" />
        <meta content={config.app.title} property="twitter:title" />
        <meta content={config.app.tagline} property="twitter:description" />
        <meta content={favicon} property="twitter:image" />
        <meta property="og:type" content="website" />
        <meta content="summary_large_image" name="twitter:card" />
        <link href={favicon} rel="shortcut icon" type="image/x-icon" />
        <link href={favicon} rel="apple-touch-icon" />
      </Head>

      <SessionProvider session={pageProps.session}>
        <QueryClientProvider client={client}>
          <AxiosProvider>
            <ExpenseMonthProvider>{getLayout(<Component {...pageProps} />)}</ExpenseMonthProvider>
          </AxiosProvider>
        </QueryClientProvider>
      </SessionProvider>
    </>
  )
}

export default App

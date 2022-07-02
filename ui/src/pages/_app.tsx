import '@/styles/globals.css'

function App({ Component, pageProps }) {
  return (
    <div className="text-h5">
      <Component {...pageProps} />
    </div>
  )
}

export default App

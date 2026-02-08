import type { AppProps } from 'next/app'
import Head from 'next/head'
import { Analytics } from '@vercel/analytics/react'
import '../styles/globals.css'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <script src="https://pl28673557.effectivegatecpm.com/85/11/89/85118992f0933623f335d164c50928aa.js"></script>
      </Head>

      <Component {...pageProps} />
      <Analytics />
    </>
  )
}

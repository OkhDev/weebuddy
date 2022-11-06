import { Session } from 'next-auth'
import { SessionProvider } from 'next-auth/react'
import type { AppProps } from 'next/app'
import '../styles/globals.css'
import GlobalStyles from '../styles/GlobalStyles'
import Navbar from '../components/Navbar'

function MyApp({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps<{ session: Session }>) {
  return (
    <SessionProvider session={session}>
      <Navbar />
      <GlobalStyles />
      <Component {...pageProps} />
    </SessionProvider>
  )
}

export default MyApp

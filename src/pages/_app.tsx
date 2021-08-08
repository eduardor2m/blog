import '../styles/globals.scss'
import type { AppProps } from 'next/app'
import { Header } from '../components/Header'
import { MenuProvider } from '../hooks/useMenu'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
    <MenuProvider>
      <Header />
      <Component {...pageProps} />
    </MenuProvider>
    </>
  )
}
export default MyApp

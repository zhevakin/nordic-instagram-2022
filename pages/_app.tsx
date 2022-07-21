import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Link from 'next/link'
import Container from '@mui/material/Container'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Container>
      <header>
        <Link href="/auth/register">Регистрация</Link>
      </header>
      <Component {...pageProps} />
    </Container>
  )
}

export default MyApp

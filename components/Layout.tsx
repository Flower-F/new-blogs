import { Box, Container } from '@chakra-ui/react'
import Head from 'next/head'
import type { Router } from 'next/router'
import type { PropsWithChildren } from 'react'

import Footer from '@/components/Footer'
import NavBar from '@/components/Navbar'

import ErrorBoundary from './ErrorBoundary'

const Layout = ({ children, router }: PropsWithChildren<{ router: Router }>) => {
  return (
    <ErrorBoundary>
      <Box as="main" pb={8}>
        <Head>
          <title>Flower-F&apos;s website</title>
          <meta name="description" content="Flower-F's website" />
          <meta name="keywords" content="blogs, notes, frontend, code, software" />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <NavBar path={router.route} />

        <Container maxW="container.md" pt={14}>
          <Box mt={8} mb={4}>
            {children}
          </Box>
          <Footer />
        </Container>
      </Box>
    </ErrorBoundary>

  )
}

export default Layout

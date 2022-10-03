import { Box, Container } from '@chakra-ui/react'
import Head from 'next/head'
import type { Router } from 'next/router'
import type { PropsWithChildren } from 'react'

import NavBar from '../components/Navbar'

const Layout = ({ children, router }: PropsWithChildren<{ router: Router }>) => {
  return (
    <Box as="main" pb={8}>
      <Head>
        <title>Flower-F&apos;s blogs</title>
        <meta name="description" content="Flower-F's blogs" />
        <meta name="keywords" content="blogs, frontend, code, software" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <NavBar path={router.route} />

      <Container maxW="container.md" pt={14}>
        <Box mt={8}>
          {children}
        </Box>
      </Container>
    </Box>
  )
}

export default Layout

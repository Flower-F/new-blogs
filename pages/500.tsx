import { Box, Button, Container, Divider, Heading, Text } from '@chakra-ui/react'
import type { NextPage } from 'next'
import Head from 'next/head'
import NextLink from 'next/link'

const ServerErrorPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Server Error</title>
      </Head>

      <Container>
        <Heading as="h1">Server Error</Heading>
        <Text>Sorry, we met some server errors</Text>
        <Divider my={6} />

        <Box my={6} textAlign="center">
          <NextLink href="/">
            <Button colorScheme="teal">Back to home page</Button>
          </NextLink>
        </Box>
      </Container>
    </>
  )
}

export default ServerErrorPage

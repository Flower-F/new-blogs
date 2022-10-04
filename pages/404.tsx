import { Box, Button, Container, Divider, Heading, Text } from '@chakra-ui/react'
import type { NextPage } from 'next'
import Head from 'next/head'
import NextLink from 'next/link'

const NotFoundPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Not Found</title>
      </Head>

      <Container>
        <Heading as="h1">Not Found</Heading>
        <Text>The page is you&apos;re looking for was not found</Text>
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

export default NotFoundPage

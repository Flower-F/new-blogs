import { Box, Button, Container, Divider, Heading, Text } from '@chakra-ui/react'
import Head from 'next/head'
import NextLink from 'next/link'
import type { PropsWithChildren } from 'react'
import { Component } from 'react'

interface ErrorBoundaryState {
  hasError: boolean
}

class ErrorBoundary extends Component<PropsWithChildren, ErrorBoundaryState> {
  constructor(props: PropsWithChildren) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError() {
    // 更新 state 使下一次渲染能够显示降级后的 UI
    return { hasError: true }
  }

  componentDidCatch() {
    // 将错误日志上报给服务器
    // logErrorToServer(error.message)
  }

  render() {
    const { children } = this.props
    const { hasError } = this.state

    if (hasError) {
      // 自定义降级后的 UI 并渲染
      return (
        <Container pt={14}>
          <Head>
            <title>Unknown Error</title>
          </Head>

          <Heading as="h1">Unknown Error</Heading>
          <Text>Sorry, we met some unknown errors</Text>

          <Divider my={3} />

          <Box my={6} textAlign="center">
            <NextLink href="/">
              <Button colorScheme="teal">Back to home page</Button>
            </NextLink>
          </Box>
        </Container>
      )
    }

    return children
  }
}

export default ErrorBoundary

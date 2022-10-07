import { Badge, Box, Flex, Heading, Img, Link, ListItem, OrderedList, Stack, Text, UnorderedList, useColorModeValue } from '@chakra-ui/react'
import NextLink from 'next/link'
import { useRouter } from 'next/router'
import ReactMarkdown from 'react-markdown'
import { PrismAsyncLight as SyntaxHighlighter } from 'react-syntax-highlighter'
import bash from 'react-syntax-highlighter/dist/cjs/languages/prism/bash'
import cpp from 'react-syntax-highlighter/dist/cjs/languages/prism/cpp'
import css from 'react-syntax-highlighter/dist/cjs/languages/prism/css'
import js from 'react-syntax-highlighter/dist/cjs/languages/prism/javascript'
import jsx from 'react-syntax-highlighter/dist/cjs/languages/prism/jsx'
import rs from 'react-syntax-highlighter/dist/cjs/languages/prism/rust'
import scss from 'react-syntax-highlighter/dist/cjs/languages/prism/scss'
import tsx from 'react-syntax-highlighter/dist/cjs/languages/prism/tsx'
import ts from 'react-syntax-highlighter/dist/cjs/languages/prism/typescript'
import theme from 'react-syntax-highlighter/dist/cjs/styles/prism/night-owl'
import remarkGfm from 'remark-gfm'

import Date from '@/components/Date'
import type { ArticleDetailType } from '@/libs/article'

SyntaxHighlighter.registerLanguage('js', js)
SyntaxHighlighter.registerLanguage('jsx', jsx)
SyntaxHighlighter.registerLanguage('css', css)
SyntaxHighlighter.registerLanguage('scss', scss)
SyntaxHighlighter.registerLanguage('cpp', cpp)
SyntaxHighlighter.registerLanguage('ts', ts)
SyntaxHighlighter.registerLanguage('tsx', tsx)
SyntaxHighlighter.registerLanguage('rs', rs)
SyntaxHighlighter.registerLanguage('bash', bash)

const ArticleDetail = ({ article }: { article: ArticleDetailType }) => {
  const router = useRouter()
  const badgeColorScheme = useColorModeValue('whatsapp', 'teal')

  const customRenderer = {
    p(paragraph: any) {
      const { node } = paragraph
      if (node.children[0].tagName === 'img') {
        const image = node.children[0]
        return (
          <Box as="p" textAlign="center">
            <Img
              src={`/images${router.asPath}/${image.properties.src}`}
              alt={image.properties.alt || ''}
              loading="lazy"
              placeholder="blur"
              display="inline-block"
            />
          </Box>
        )
      }
      return <Text fontSize="md" variant="article-text">{paragraph.children}</Text>
    },
    h2(h2: any) {
      const { children } = h2
      return <Heading as="h2" size="md" variant="section-title">{children}</Heading>
    },
    h3(h3: any) {
      const { children } = h3
      return <Heading as="h3" size="sm" variant="section-title">{children}</Heading>
    },
    a(a: any) {
      const { node, href } = a
      return (
        <NextLink passHref href={href}>
          <Link target="_blank">{node.children[0].value}</Link>
        </NextLink>
      )
    },
    ol(ol: any) {
      const { children } = ol
      return <OrderedList pl={5}>{children}</OrderedList>
    },
    ul(ul: any) {
      const { children } = ul
      return <UnorderedList pl={6}>{children}</UnorderedList>
    },
    li(li: any) {
      const { children } = li
      return <ListItem>{children}</ListItem>
    },
    code(code: any) {
      const { className, children } = code // language-js
      if (!className) {
        return (
          <Badge
            colorScheme={badgeColorScheme}
            display="inline-flex"
            alignItems="center"
            mb="2px"
            textTransform="initial"
          >
            {children}
          </Badge>
        )
      }
      const language = className.split('-')[1] // js
      return (
        <Box
          as={SyntaxHighlighter}
          style={theme}
          language={language}
          children={children}
          showLineNumbers={true}
          borderStyle="solid"
          borderWidth={2}
          borderColor="chakra-border-color"
        />
      )
    },
  }

  return (
    <Stack as="article" spacing={4}>
      <Heading as="h1" size="lg" variant="article-title">{article.title}</Heading>
      <Flex justifyContent="flex-end">
        <Date dateString={article.date} />
      </Flex>
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={customRenderer} children={article.content} />
    </Stack>
  )
}

export default ArticleDetail

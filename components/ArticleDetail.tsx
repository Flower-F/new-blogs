import { Box, Flex, Heading, Img, Link, ListItem, OrderedList, Stack, Table, TableContainer, Tbody, Td, Text, Tfoot, Th, Thead, Tr, UnorderedList, useColorModeValue } from '@chakra-ui/react'
import NextLink from 'next/link'
import { useRouter } from 'next/router'
import ReactMarkdown from 'react-markdown'
import { PrismAsyncLight as SyntaxHighlighter } from 'react-syntax-highlighter'
import bash from 'react-syntax-highlighter/dist/cjs/languages/prism/bash'
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
SyntaxHighlighter.registerLanguage('ts', ts)
SyntaxHighlighter.registerLanguage('tsx', tsx)
SyntaxHighlighter.registerLanguage('rs', rs)
SyntaxHighlighter.registerLanguage('bash', bash)

const ArticleDetail = ({ article }: { article: ArticleDetailType }) => {
  const router = useRouter()
  const tagTextColorScheme = useColorModeValue('blackAlpha.800', 'gray.200')
  const tagBackgroundColorScheme = useColorModeValue('blackAlpha.100', 'whiteAlpha.300')

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
      return <Heading as="h2" size="lg" variant="article-title">{children}</Heading>
    },
    h3(h3: any) {
      const { children } = h3
      return <Heading as="h3" size="md" variant="article-title">{children}</Heading>
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
      return <UnorderedList pl={5}>{children}</UnorderedList>
    },
    li(li: any) {
      const { children } = li
      return <ListItem mt="1.5">{children}</ListItem>
    },
    table(table: any) {
      const { children } = table
      return (
        <TableContainer>
          <Table>
            {children}
          </Table>
        </TableContainer>
      )
    },
    thead(thead: any) {
      const { children } = thead
      return <Thead>{children}</Thead>
    },
    tbody(tbody: any) {
      const { children } = tbody
      return <Tbody>{children}</Tbody>
    },
    tfoot(tfoot: any) {
      const { children } = tfoot
      return <Tfoot>{children}</Tfoot>
    },
    tr(tr: any) {
      const { children } = tr
      return <Tr>{children}</Tr>
    },
    th(th: any) {
      const { children } = th
      return (
        <Th
          borderColor="gray.400"
          fontSize="1rem"
          fontFamily="\'Microsoft YaHei\', sans-serif"
        >
          {children}
        </Th>
      )
    },
    td(td: any) {
      const { children } = td
      return <Td borderColor="gray.400">{children}</Td>
    },
    code(code: any) {
      const { className, children } = code // language-js
      if (!className) {
        return (
          <Text
            as="span"
            color={tagTextColorScheme}
            backgroundColor={tagBackgroundColorScheme}
            fontFamily="\'Microsoft YaHei\', sans-serif"
            fontWeight="bold"
            fontSize="14px"
            px="4px"
            borderRadius="sm"
          >
            {children}
          </Text>
        )
      }
      const language = className.split('-')[1] // js
      return (
        <Box
          as={SyntaxHighlighter}
          style={theme}
          language={language}
          children={children}
          borderStyle="solid"
          borderWidth={2}
          borderColor="chakra-border-color"
        />
      )
    },
  }

  return (
    <Stack as="article" spacing={4}>
      <Heading as="h1" size="xl" variant="article-title">{article.title}</Heading>
      <Flex justifyContent="flex-end">
        <Date dateString={article.date} />
      </Flex>
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={customRenderer} children={article.content} />
    </Stack>
  )
}

export default ArticleDetail

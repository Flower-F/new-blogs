import { Badge, Heading, Link, ListItem, Stack, useColorModeValue } from '@chakra-ui/react'
import NextLink from 'next/link'
import { useRouter } from 'next/router'

import Date from '@/components//Date'
import type { ArticleTitleType } from '@/libs/article'

const ArticleTitle = ({ article }: { article: ArticleTitleType }) => {
  const router = useRouter()
  const badgeColorScheme = useColorModeValue('blue', 'teal')

  return (
    <ListItem as={Stack} mb={6}>
      <NextLink href={`${router.asPath}/${article.id}`} passHref>
        <Link>
          <Heading as="h4" size="md">{article.title}</Heading >
        </Link>
      </NextLink>
      <Stack direction="row">
        <Date dateString={article.date} />
        {
          article.keywords.map(keyword => (
            <Badge
              variant="solid"
              key={keyword}
              colorScheme={badgeColorScheme}
              display="inline-flex"
              alignItems="center"
            >
              {keyword}
            </Badge>
          ))
        }
      </Stack>
    </ListItem>
  )
}

export default ArticleTitle

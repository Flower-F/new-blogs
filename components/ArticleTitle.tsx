import { Badge, Heading, Link, ListItem, Stack, useColorModeValue } from '@chakra-ui/react'
import NextLink from 'next/link'

import type { ArticleTitleType } from '../libs/article'
import Date from './Date'

const ArticleTitle = ({ note }: { note: ArticleTitleType }) => {
  const badgeColorScheme = useColorModeValue('blue', 'teal')

  return (
    <ListItem as={Stack} mb={6}>
      <NextLink href={`/notes/${note.id}`} passHref>
        <Link>
          <Heading as="h4" size="md">{note.title}</Heading >
        </Link>
      </NextLink>
      <Stack direction="row">
        <Date dateString={note.date} />
        {
          note.keywords.map(keyword => (
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

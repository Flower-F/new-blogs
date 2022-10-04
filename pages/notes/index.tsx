import { Container, List } from '@chakra-ui/react'
import type { NextPage } from 'next'
import Head from 'next/head'

import ArticleTitle from '../../components/ArticleTitle'
import type { ArticleTitleType } from '../../libs/article'
import { getAllNotesData } from '../../libs/article'

const AllNotesPage: NextPage<{ notes: ArticleTitleType[] }> = ({ notes }) => {
  return (
    <>
      <Head>
        <title>Flower-F&apos;s notes</title>
        <meta name="description" content="Flower-F's notes" />
      </Head>

      <Container>
        <List>
          {
            notes.map(note => (
              <ArticleTitle note={note} key={note.id} />
            ))
          }
        </List>
      </Container>
    </>
  )
}

export async function getStaticProps() {
  const allNotes = getAllNotesData()
  return {
    props: {
      notes: allNotes,
    },
  }
}

export default AllNotesPage

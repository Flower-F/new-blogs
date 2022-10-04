import { Container } from '@chakra-ui/react'
import type { GetStaticPropsContext, NextPage } from 'next'
import Head from 'next/head'

import ArticleDetail from '../../components/ArticleDetail'
import type { ArticleDetailType } from '../../libs/article'
import { getAllNotesIds, getNotesDataById } from '../../libs/article'

const NotesDetailPage: NextPage<{ note: ArticleDetailType }> = ({ note }) => {
  return (
    <>
      <Head>
        <title>{note.title}</title>
        <meta name="description" content={note.title} />
      </Head>

      <Container>
        <ArticleDetail note={note} />
      </Container>
    </>
  )
}

export async function getStaticPaths() {
  const paths = getAllNotesIds()
  return {
    paths,
    fallback: false,
  }
}

export async function getStaticProps({ params }: GetStaticPropsContext) {
  const note = getNotesDataById(params?.id as string)
  return {
    props: {
      note,
    },
  }
}

export default NotesDetailPage

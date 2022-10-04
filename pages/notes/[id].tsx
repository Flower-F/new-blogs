import { Container } from '@chakra-ui/react'
import type { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import Head from 'next/head'

import ArticleDetail from '@/components/ArticleDetail'
import type { ArticleDetailType } from '@/libs/article'
import { getAllNoteIds, getNoteDataById } from '@/libs/article'

const NoteDetailPage: NextPage<{ note: ArticleDetailType }> = ({ note }) => {
  return (
    <>
      <Head>
        <title>{note.title}</title>
        <meta name="description" content={note.title} />
      </Head>

      <Container>
        <ArticleDetail article={note} />
      </Container>
    </>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = getAllNoteIds()
  return {
    paths,
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  let note
  if (params && typeof params.id === 'string') {
    note = getNoteDataById(params.id)
  }
  return {
    props: {
      note,
    },
  }
}

export default NoteDetailPage

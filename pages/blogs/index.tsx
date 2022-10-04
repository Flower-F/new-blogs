import { Container, List } from '@chakra-ui/react'
import type { NextPage } from 'next'
import Head from 'next/head'

import ArticleTitle from '@/components/ArticleTitle'
import type { ArticleTitleType } from '@/libs/article'
import { getAllBlogsData } from '@/libs/article'

const AllBlogsPage: NextPage<{ blogs: ArticleTitleType[] }> = ({ blogs }) => {
  return (
    <>
      <Head>
        <title>Flower-F&apos;s blogs</title>
        <meta name="description" content="Flower-F's blogs" />
      </Head>

      <Container>
        <List>
          {
            blogs.map(blog => (
              <ArticleTitle article={blog} key={blog.id} />
            ))
          }
        </List>
      </Container>
    </>
  )
}

export async function getStaticProps() {
  const allBlogs = getAllBlogsData()
  return {
    props: {
      blogs: allBlogs,
    },
  }
}

export default AllBlogsPage

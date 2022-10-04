import { Container } from '@chakra-ui/react'
import type { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import Head from 'next/head'

import ArticleDetail from '@/components/ArticleDetail'
import type { ArticleDetailType } from '@/libs/article'
import { getAllBlogIds, getBlogDataById } from '@/libs/article'

const BlogDetailPage: NextPage<{ blog: ArticleDetailType }> = ({ blog }) => {
  return (
    <>
      <Head>
        <title>{blog.title}</title>
        <meta name="description" content={blog.title} />
      </Head>

      <Container>
        <ArticleDetail article={blog} />
      </Container>
    </>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = getAllBlogIds()
  return {
    paths,
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  let blog
  if (params && typeof params.id === 'string') {
    blog = getBlogDataById(params.id)
  }
  return {
    props: {
      blog,
    },
    revalidate: 10,
  }
}

export default BlogDetailPage

import { ChevronRightIcon } from '@chakra-ui/icons'
import { Box, Button, Container, Heading, Image, Link, List, ListItem, useColorModeValue } from '@chakra-ui/react'
import NextLink from 'next/link'
import { IoLogoGithub, IoLogoTwitter } from 'react-icons/io'

import { BioSection } from '../components/BioSection'
import { BioYear } from '../components/BioYear'
import Paragraph from '../components/Paragraph'
import Section from '../components/Section'

const IndexPage = () => {
  return (
    <Container>
      <Box
        borderRadius="lg" textAlign="center" p={3} mb={6}
        bg={useColorModeValue('whiteAlpha.500', 'whiteAlpha.200')}
      >
        Hi, I&apos;am a frontend hobbyist and developer from China!
      </Box>

      <Box display={{ md: 'flex' }}>
        <Box flexGrow={1}>
          <Heading as="h2" variant="page-title">Flower-F</Heading>
          <p>A Frontend Hobbyist and Developer</p>
        </Box>
        <Box flexShrink={0} mt={{ base: 4, md: 0 }} ml={{ md: 6 }} textAlign="center">
          <Image
            borderColor="blackAlpha.800"
            borderWidth={2}
            borderStyle="solid"
            maxWidth={100}
            display="inline-block"
            borderRadius="full"
            src="/images/avatar.jpg"
            alt="Profile Image"
          />
        </Box>
      </Box>

      <Section delay={0.1}>
        <Heading as="h3" variant="section-title">
          Intro
        </Heading>
        <Paragraph>
          Hi, I&apos;m a frontend developer in Shenzhen. I do well in frontend basic knowledge
          such as React, Webpack, Vite, Atomic CSS, Next.js and so on. I dream of
          becoming an outstanding frontend developer, and I would like to do my best to contribute to
          the open source community. Now I have contributed to the {' '}
          <NextLink href="https://github.com/unocss/unocss" passHref>
            <Link target="_blank">UnoCSS</Link>
          </NextLink>
          , which is an atomic CSS engine.
          By the way, if you want to build your App with some opinionated configurations,
          welcome to use my starter template of React and Vite which is called {' '}
          <NextLink href="https://github.com/Flower-F/revitesse-lite" passHref>
            <Link target="_blank">Revitesse</Link>
          </NextLink>.
          In addition, you can try an App built by myself with Revitesse {' '}
          <NextLink href="https://biaolegeqing.netlify.app" passHref>
            <Link target="_blank">here</Link>
          </NextLink>.
        </Paragraph>
      </Section>

      <Section delay={0.2}>
        <Heading as="h3" variant="section-title">
          Bio
        </Heading>
        <BioSection>
          <BioYear>2000</BioYear>
          Born in Guangdong, China.
        </BioSection>
        <BioSection>
          <BioYear>2019</BioYear>
          Start to learn Software Engineering in SCUT.
          </BioSection>
        <BioSection>
          <BioYear>2021</BioYear>
          Start to learn frontend knowledge.
        </BioSection>
        <BioSection>
          <BioYear>2022</BioYear>
          Intern in Tencent Music Entertainment.
        </BioSection>
        <BioYear>
          To be continued...
        </BioYear>
      </Section>

      <Section delay={0.3}>
        <Heading as="h3" variant="section-title">
          Hobbies
        </Heading>
        <Paragraph>
          Magic Cube, HipHop, Computer Network, Compilation Principle, Data Structure and Algorithm
        </Paragraph>
      </Section>

      <Section delay={0.4}>
        <Heading as="h3" variant="section-title">
          Find me on
        </Heading>
        <List>
          <ListItem>
            <Link href="https://github.com/flower-f" target="_blank">
              <Button variant="ghost" colorScheme="teal" leftIcon={<IoLogoGithub />}>
                @flower-f
              </Button>
            </Link>
          </ListItem>
          <ListItem>
            <Link href="https://twitter.com/cloudboyhuang" target="_blank">
              <Button variant="ghost" colorScheme="teal" leftIcon={<IoLogoTwitter />}>
                @cloudboyhuang
              </Button>
            </Link>
          </ListItem>
        </List>
      </Section>

      <Box textAlign="center" my={4}>
        <NextLink href="/blogs" passHref scroll={false}>
          <Button rightIcon={<ChevronRightIcon />} colorScheme="teal">
            Recent blogs
          </Button>
        </NextLink>
      </Box>
    </Container>
  )
}

export default IndexPage

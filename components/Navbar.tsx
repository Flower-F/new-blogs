import { HamburgerIcon } from '@chakra-ui/icons'
import type { LinkProps } from '@chakra-ui/react'
import { Box, Container, Flex, Heading, IconButton, Link, Menu, MenuButton, MenuItem, MenuList, Stack, useColorModeValue } from '@chakra-ui/react'
import NextLink from 'next/link'
import type { PropsWithChildren } from 'react'
import { IoLogoGithub } from 'react-icons/io'

import Logo from './Logo'
import ThemeToggleButton from './ThemeToggleButton'

const LinkItem = ({ href, path, children, ...props }: PropsWithChildren<LinkProps & { path: string; href: string }>) => {
  const active = path === href
  const inactiveColor = useColorModeValue('gray200', 'whiteAlpha.900')

  return (
    <NextLink href={href} passHref>
      <Link p={2} bg={active ? 'glassTeal' : undefined} color={active ? '#202023' : inactiveColor} {...props}>
        {children}
      </Link>
    </NextLink>
  )
}

const NavBar = ({ path }: { path: string }) => {
  return (
    <Box
      position="fixed"
      as="nav"
      w="100%"
      zIndex={1}
      bg={useColorModeValue('#ffffff40', '#20202380')}
      style={{ backdropFilter: 'blur(10px)' }}
    >
      <Container
        display="flex"
        maxW="container.md"
        flexWrap="wrap"
        textAlign="center"
        justifyContent="space-between"
        p={2}
      >
        <Flex alignItems="center" mr={5}>
          <Heading as="h1" size="lg" letterSpacing="tighter">
            <Logo />
          </Heading>
        </Flex>

        <Stack
          direction={{ base: 'column', md: 'row' }}
          display={{ base: 'none', md: 'flex' }}
          width={{ base: 'full', md: 'auto' }}
          alignItems="center" flexGrow={1} mt={{ base: 4, md: 0 }}
        >
          <LinkItem href="/blogs" path={path}>
            Blogs
          </LinkItem>
          <LinkItem
            target="_blank"
            path={path}
            href="https://github.com/Flower-F/new-blogs"
            display="inline-flex"
            alignItems="center"
            style={{ gap: 4 }}
            pl={2}
          >
            <IoLogoGithub />
            Source
          </LinkItem>
        </Stack>

        <Box flex={1} textAlign="right">
          <ThemeToggleButton />
          <Box ml={2} display={{ base: 'inline-block', md: 'none' }}>
            <Menu>
              <MenuButton as={IconButton} icon={<HamburgerIcon />} variant="outline" aria-label="Options" />
              <MenuList>
                <NextLink href="/blogs">
                  <MenuItem>Blogs</MenuItem>
                </NextLink>
                <NextLink href="https://flower-f.github.io" passHref>
                  <MenuItem as={Link} target="_blank">View Source</MenuItem>
                </NextLink>
              </MenuList>
            </Menu>
          </Box>
        </Box>
      </Container>
    </Box>
  )
}

export default NavBar

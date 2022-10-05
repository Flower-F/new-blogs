import { HamburgerIcon } from '@chakra-ui/icons'
import type { LinkProps } from '@chakra-ui/react'
import { Box, Container, Flex, Heading, IconButton, Link, Menu, MenuButton, MenuItem, MenuList, Stack, useColorModeValue } from '@chakra-ui/react'
import NextLink from 'next/link'
import type { PropsWithChildren } from 'react'
import { IoLogoGithub } from 'react-icons/io'

import Logo from '@/components/Logo'
import ThemeToggleButton from '@/components/ThemeToggleButton'

const LinkItem = ({ href, path, children, ...props }: PropsWithChildren<LinkProps & { path: string; href: string }>) => {
  const active = path === href
  const inactiveColor = useColorModeValue('blackAlpha.900', 'whiteAlpha.900')

  return (
    <NextLink href={href} passHref>
      <Link p={2} bg={active ? 'glassTeal' : undefined} color={active ? '#202023' : inactiveColor} {...props}>
        {children}
      </Link>
    </NextLink>
  )
}

const MenuLinkItem = ({ href, path, children, target }: PropsWithChildren<LinkProps & { path: string; href: string }>) => {
  const active = path === href
  const activeBackgroundColor = useColorModeValue('gray.100', 'whiteAlpha.100')

  return (
    <NextLink href={href} passHref>
      <MenuItem
        as={Link}
        path={path}
        target={target}
        bg={active ? activeBackgroundColor : 'transparent'}
        _focus={{ background: active ? activeBackgroundColor : 'transparent' }}
      >
        {children}
      </MenuItem>
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
      bg={useColorModeValue('rgba(255, 255, 255, 0.2)', 'rgba(32, 32, 35, 0.5)')}
      style={{ backdropFilter: 'blur(10px)' }}
    >
      <Container
        display="flex"
        maxW="900px"
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
          direction="row"
          display={{ base: 'none', md: 'flex' }}
          width="auto"
          flexGrow={1}
          mt={{ base: 4, md: 0 }}
        >
          <LinkItem href="/blogs" path={path}>
            Blogs
          </LinkItem>
          <LinkItem href="/notes" path={path}>
            Notes
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
                <MenuLinkItem href="/" path={path}>About</MenuLinkItem>
                <MenuLinkItem href="/blogs" path={path}>Blogs</MenuLinkItem>
                <MenuLinkItem href="/notes" path={path}>Notes</MenuLinkItem>
                <MenuLinkItem href="https://github.com/Flower-F/new-blogs" path={path} target="_blank">
                  View Source
                </MenuLinkItem>
              </MenuList>
            </Menu>
          </Box>
        </Box>
      </Container>
    </Box>
  )
}

export default NavBar

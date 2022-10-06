import { Link, Text, useColorModeValue } from '@chakra-ui/react'
import styled from '@emotion/styled'
import Image from 'next/image'
import NextLink from 'next/link'

const LogoBox = styled(Link)`
  font-weight: bold;
  font-size: 18px;
  display: inline-flex;
  align-items: center;
  height: 30px;
  line-height: 20px;
  padding: 10px;
  cursor: pointer;

  img {
    transition: 200ms ease;
  }

  &:hover img {
    transform: rotate(20deg);
  }
`

const Logo = () => {
  const logoImage = `/images/flower${useColorModeValue('', '-dark')}.png`

  return (
    <NextLink href="/" passHref>
      <LogoBox>
        <Image src={logoImage} width={20} height={20} alt="logo" />
        <Text
          color={useColorModeValue('gray.800', 'whiteAlpha.900')}
          fontWeight="bold"
          letterSpacing={0.2}
          ml={1}
        >
          Flower-F
        </Text>
      </LogoBox>
    </NextLink>
  )
}

export default Logo

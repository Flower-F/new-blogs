import { Box, Link } from '@chakra-ui/react'
import NextLink from 'next/link'

const Footer = () => {
  return (
    <>
      <Box textAlign="center" opacity={0.8} fontSize="sm">
        &copy;{new Date().getFullYear()} Flower-F. All Rights Reserved.
      </Box>
      <Box textAlign="center" opacity={0.8} fontSize="sm">
        Built based on the {' '}
        <NextLink href="https://www.craftz.dog" passHref>
          <Link target="_blank">Takuya Matsuyama&apos;s website</Link>
        </NextLink>.
      </Box>
    </>
  )
}

export default Footer

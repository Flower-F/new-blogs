import { Box, Link } from '@chakra-ui/react'
import NextLink from 'next/link'

const Footer = () => {
  return (
    <>
      <Box textAlign="center" opacity={0.7} fontSize="sm">
        &copy;{new Date().getFullYear()} Flower-F. All Rights Reserved.
      </Box>
      <Box textAlign="center" opacity={0.7} fontSize="sm">
        Built based on {' '}
        <NextLink href="https://www.craftz.dog" passHref>
          <Link target="_blank">Takuya Matsuyama&apos;s website</Link>
        </NextLink>.
      </Box>
    </>
  )
}

export default Footer

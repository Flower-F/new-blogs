import { chakra, shouldForwardProp } from '@chakra-ui/react'
import { motion } from 'framer-motion'
import type { PropsWithChildren } from 'react'

const Container = chakra(motion.div, {
  shouldForwardProp: (prop) => {
    return shouldForwardProp(prop) || prop === 'transition'
  },
})

const Section = ({ children, delay = 0 }: PropsWithChildren<{ delay: number }>) => {
  return (
    <Container
      initial={{ y: 10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: '0.8', delay: delay.toString() }}
      mb={6}
    >
      {children}
    </Container>
  )
}

export default Section

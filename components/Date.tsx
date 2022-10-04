import { Box } from '@chakra-ui/react'
import { format, parseISO } from 'date-fns'

const Date = ({ dateString }: { dateString: string }) => {
  const date = parseISO(dateString)
  return <Box as="time" dateTime={dateString} fontWeight="medium">{format(date, 'LLLL d, yyyy')}</Box>
}

export default Date

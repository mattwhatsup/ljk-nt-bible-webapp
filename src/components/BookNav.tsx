import { Box } from '@chakra-ui/react'
import BibleSelector from '@/components/BibleSelector/BibleSelector'
type Props = {}

export default function BookNav({}: Props) {
  return (
    <Box
      as="header"
      display={'flex'}
      py={4}
      pt={20}
      position={'fixed'}
      width={'full'}
      bg={'teal.500'}
      justifyContent={'center'}
      zIndex={99}
    >
      <Box width={'2xl'}>
        <BibleSelector
          selected={{
            book: 783907,
            chapter: 1,
            verse: 2,
          }}
          onChange={selected => {
            console.log(selected)
          }}
        />
      </Box>
    </Box>
  )
}

import { Box } from '@chakra-ui/react'
import BibleSelector from '@/components/BibleSelector/BibleSelector'
import type { SelectValue } from './BibleSelector/BibleDropDown'
import { useParams } from 'react-router-dom'
import { useColorPalette } from '@/features/settings/settingsSlice'
import { useNavigateBible } from '@/useNavigateBible'

type Props = {}

export default function BookNav({}: Props) {
  const { book, chapter } = useParams<{ book: string; chapter?: string }>()

  const selected: SelectValue = {
    book,
    chapter: chapter ? parseInt(chapter) : undefined,
  }
  const navigateBible = useNavigateBible()

  return (
    <Box
      as="header"
      display={'flex'}
      py={4}
      pt={20}
      position={'fixed'}
      width={'full'}
      bg={`${useColorPalette()}.500`}
      justifyContent={'center'}
      zIndex={99}
    >
      <Box width={'2xl'} display={'flex'} justifyContent={'space-between'}>
        <BibleSelector
          selected={selected}
          onChange={(selected: SelectValue) => {
            const newBook = selected.book
            const newChapter = selected.chapter

            if (newBook) {
              navigateBible(newBook, newChapter || 1)
            }
          }}
        />
      </Box>
    </Box>
  )
}

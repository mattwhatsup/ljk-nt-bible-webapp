import { Box } from '@chakra-ui/react'
import BibleSelector from '@/components/BibleSelector/BibleSelector'
import type { SelectValue } from './BibleSelector/BibleDropDown'
import { useNavigate, useParams } from 'react-router-dom'
import { useColorPalette } from '@/features/settings/settingsSlice'

type Props = {}

export default function BookNav({}: Props) {
  const { book, chapter } = useParams<{ book: string; chapter?: string }>()
  const navigate = useNavigate()

  const selected: SelectValue = {
    book,
    chapter: chapter ? parseInt(chapter) : undefined,
  }

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
              const newPath = newChapter
                ? `/book/${newBook}/${newChapter}`
                : `/book/${newBook}`
              navigate(newPath)
            }
          }}
        />
      </Box>
    </Box>
  )
}

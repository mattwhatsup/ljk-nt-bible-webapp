import { Box, HStack } from '@chakra-ui/react'
import { SegmentGroup } from '@chakra-ui/react'
import { Switch } from './ui/switch'
import BibleSelector from '@/components/BibleSelector/BibleSelector'
import type { SelectValue } from './BibleSelector/BibleDropDown'
import { useNavigate, useParams } from 'react-router-dom'

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
      bg={'teal.500'}
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

        <HStack>
          <Switch colorPalette={'blue'} defaultChecked mr={1} color={'white'}>
            显示注释
          </Switch>

          <SegmentGroup.Root defaultValue="cn" size={'sm'}>
            <SegmentGroup.Indicator />
            <SegmentGroup.Items
              items={[
                { value: 'cn', label: '简' },
                { value: 'tw', label: '繁' },
              ]}
            />
          </SegmentGroup.Root>
        </HStack>
      </Box>
    </Box>
  )
}

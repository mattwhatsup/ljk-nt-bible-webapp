import type { FunctionComponent, HTMLAttributes } from 'react'
import { useContext } from 'react'
import ChapterList from './ChapterList'
import VerseList from './VerseList'
import './BibleSelector.css'
import type { BibleSelectorProps } from './BibleDropDown'
import { SelectedValueContext } from './BibleSelector'
import { Box, HStack } from '@chakra-ui/react'
import { BibleSelectorContext } from './BibleSelectorContextProvider'

interface ChapterPopupSelectorProps extends HTMLAttributes<HTMLDivElement> {}

const ChapterPopupSelector: FunctionComponent<
  ChapterPopupSelectorProps & Partial<BibleSelectorProps>
> = () => {
  const { selected } = useContext(SelectedValueContext)!
  const { showVerseSelector } = useContext(BibleSelectorContext)!

  const cols = 1 + (selected?.chapter ? (showVerseSelector ? 1 : 0) : 0)
  const widths = {
    1: '14rem',
    2: '28rem',
  } as Record<number, string>

  return (
    <Box position={'relative'} rounded={'md'} width={widths[cols]}>
      <HStack>
        <ChapterList className="flex-1" />
        {showVerseSelector && selected?.chapter && (
          <VerseList className="flex-1 ml-2" />
        )}
      </HStack>
    </Box>
  )
}

export default ChapterPopupSelector

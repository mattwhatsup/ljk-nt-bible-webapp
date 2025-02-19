import type { FunctionComponent, HTMLAttributes } from 'react'
import { useContext } from 'react'
import BookList from './BookList'
import ChapterList from './ChapterList'
import VerseList from './VerseList'
import type { BibleSelectorProps } from './BibleDropDown'
import './BibleSelector.css'
import BibleSelectorPanelCloser from './BibleSelectorPanelCloser'
import { SelectedValueContext } from '.'
import { Box, Stack } from '@chakra-ui/react'

interface BookPopupSelectorProps extends HTMLAttributes<HTMLDivElement> {}

const BookPopupSelector: FunctionComponent<
  BookPopupSelectorProps & Partial<BibleSelectorProps>
> = ({ className, selectType, onClose }) => {
  const { selected } = useContext(SelectedValueContext)!

  const cols =
    1 + (selected?.book ? 1 : 0) + (selected?.book && selected?.chapter ? 1 : 0)
  const widths = {
    1: '14rem',
    2: '28rem',
    3: '42rem',
  } as Record<number, string>

  return (
    <Box position={'relative'} rounded={'md'} width={widths[cols]}>
      <Stack direction={'row'}>
        <BookList className="flex-1  " />
        {selected?.book && <ChapterList className="flex-1  ml-2" />}
        {selected?.book && selected?.chapter && (
          <VerseList className="flex-1 ml-2 " closeHandler={onClose} />
        )}
      </Stack>
    </Box>
  )
}

export default BookPopupSelector

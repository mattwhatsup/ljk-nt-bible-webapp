import type { FunctionComponent, HTMLAttributes } from 'react'
import { useContext, useEffect, useRef } from 'react'
import BookList from './BookList'
import ChapterList from './ChapterList'
import VerseList from './VerseList'
import type { BibleSelectorProps } from './BibleDropDown'
import './BibleSelector.css'
import { SelectedValueContext } from './BibleSelector'
import { Box, Stack, Tabs, Text } from '@chakra-ui/react'
import { BibleSelectorContext } from './BibleSelectorContextProvider'
import {
  _T,
  getUiSizeClassName,
  useLanguage,
  useT,
  useUiSize,
} from '@/features/settings/settingsSlice'

interface BookPopupSelectorProps extends HTMLAttributes<HTMLDivElement> {
  tabView?: string
}

const BookPopupSelector: FunctionComponent<
  BookPopupSelectorProps & Partial<BibleSelectorProps>
> = ({ className, selectType, onClose, tabView }) => {
  const { selected } = useContext(SelectedValueContext)!
  const { showVerseSelector } = useContext(BibleSelectorContext)!
  const chapterTabRef = useRef<HTMLButtonElement>(null)
  const prevBookRef = useRef(selected?.book)
  const language = useLanguage()
  const uiSize = useUiSize()

  const cols =
    1 +
    (selected?.book ? 1 : 0) +
    (selected?.book && selected?.chapter ? (showVerseSelector ? 1 : 0) : 0)
  const widths = {
    1: '14rem',
    2: '28rem',
    3: '42rem',
  } as Record<number, string>

  useEffect(() => {
    if (prevBookRef.current === selected?.book) {
      return
    }
    prevBookRef.current = selected?.book
    if (chapterTabRef.current) {
      console.log('change book', selected?.book)
      chapterTabRef.current.click()
    }
  }, [selected?.book])

  return tabView ? (
    <Tabs.Root
      defaultValue={tabView}
      flex={1}
      display={'flex'}
      flexDirection={'column'}
      // @ts-ignore
      size={getUiSizeClassName('sm', uiSize, 'control')}
    >
      <Tabs.List>
        <Tabs.Trigger value="books">
          <Text fontSize={getUiSizeClassName('sm', uiSize, 'text')}>
            {_T(['书卷', '書卷'], language)}
          </Text>
        </Tabs.Trigger>
        {selected?.book && (
          <Tabs.Trigger value="chapters" ref={chapterTabRef}>
            <Text fontSize={getUiSizeClassName('sm', uiSize, 'text')}>章</Text>
          </Tabs.Trigger>
        )}
      </Tabs.List>
      <Tabs.Content
        value="books"
        flex={1}
        display={'flex'}
        flexDirection={'column'}
      >
        <BookList ignoreHeader />
      </Tabs.Content>
      {selected?.book && (
        <Tabs.Content value="chapters">
          <ChapterList ignoreHeader />
        </Tabs.Content>
      )}
    </Tabs.Root>
  ) : (
    <Box position={'relative'} rounded={'md'} width={widths[cols]}>
      <Stack direction={'row'}>
        <BookList className="flex-1  " />
        {selected?.book && <ChapterList className="flex-1  ml-2" />}
        {showVerseSelector && selected?.book && selected?.chapter && (
          <VerseList className="flex-1 ml-2 " closeHandler={onClose} />
        )}
      </Stack>
    </Box>
  )
}

export default BookPopupSelector

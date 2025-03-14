import { useAppDispatch, useAppSelector } from '@/app/hooks'
import { BookName } from '@/features/book/bookApi'
import { makeSelectChapter } from '@/features/book/bookSlice'
import {
  clearSelectedVerses,
  makeChapterVersesSelector,
} from '@/features/choosen/choosenSlice'
import { selectLanguage } from '@/features/settings/settingsSlice'
import { copyToClipboard, getSelectedVersesText } from '@/utils/copy-utils'
import { ActionBar, Button, Portal } from '@chakra-ui/react'
import { FaRegCopy, FaRegTrashAlt } from 'react-icons/fa'
import { useParams } from 'react-router-dom'

type Props = {}

export default function VerseActionBar({}: Props) {
  const dispatch = useAppDispatch()
  const { book, chapter } = useParams<{ book: string; chapter?: string }>()
  const language = useAppSelector(selectLanguage)
  const chapterVersesSelector = makeChapterVersesSelector(
    book!,
    parseInt(chapter || '1'),
  )
  const selectedVerses = useAppSelector(chapterVersesSelector)
  const chapterData = useAppSelector(
    makeSelectChapter(book as BookName, parseInt(chapter || '1')),
  ).contents!.nodeData
  return (
    <ActionBar.Root open={selectedVerses.length > 0}>
      <Portal>
        <ActionBar.Positioner>
          <ActionBar.Content>
            <ActionBar.SelectionTrigger>
              选中 {selectedVerses.length}
            </ActionBar.SelectionTrigger>
            <ActionBar.Separator />
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                copyToClipboard(
                  getSelectedVersesText(
                    book as BookName,
                    parseInt(chapter || '1'),
                    selectedVerses,
                    chapterData,
                  ),
                )
                dispatch(
                  clearSelectedVerses({
                    book: book!,
                    chapter: parseInt(chapter || '1'),
                  }),
                )
              }}
            >
              <FaRegCopy />
              复制 Ctrl+C
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                dispatch(
                  clearSelectedVerses({
                    book: book!,
                    chapter: parseInt(chapter || '1'),
                  }),
                )
              }}
            >
              <FaRegTrashAlt />
              清除 Esc
            </Button>
          </ActionBar.Content>
        </ActionBar.Positioner>
      </Portal>
    </ActionBar.Root>
  )
}

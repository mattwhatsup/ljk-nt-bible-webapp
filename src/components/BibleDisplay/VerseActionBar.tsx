import { useAppDispatch, useAppSelector } from '@/app/hooks'
import type { BookName } from '@/features/book/bookApi'
import { makeSelectChapter } from '@/features/book/bookSlice'
import {
  clearSelectedVerses,
  makeChapterVersesSelector,
} from '@/features/choosen/choosenSlice'
import { selectLanguage } from '@/features/settings/settingsSlice'
import { copyToClipboard, getSelectedVersesText } from '@/utils/copy-utils'
import { ActionBar, Button, Portal } from '@chakra-ui/react'
import { useCallback, useEffect } from 'react'
import { FaRegCopy, FaRegTrashAlt } from 'react-icons/fa'
import { useParams } from 'react-router-dom'
import { toaster, Toaster } from '../ui/toaster'
import { Tooltip } from '../ui/tooltip'

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

  const handleCopy = useCallback(() => {
    if (!selectedVerses.length) return
    copyToClipboard(
      getSelectedVersesText(
        language,
        book as BookName,
        parseInt(chapter || '1'),
        selectedVerses,
        chapterData,
      ),
    )
      .then(() => {
        toaster.create({
          title: `已复制 ${selectedVerses.length} 节经文`,
          type: 'success',
        })
      })
      .catch(() => {
        toaster.create({
          title: '复制失败',
          type: 'error',
        })
      })
    dispatch(
      clearSelectedVerses({
        book: book!,
        chapter: parseInt(chapter || '1'),
      }),
    )
  }, [language, book, chapter, selectedVerses, chapterData, dispatch])

  const handleCancel = useCallback(() => {
    if (!selectedVerses.length) return
    toaster.create({
      title: `已取消选择 ${selectedVerses.length} 节经文`,
      type: 'success',
    })
    dispatch(
      clearSelectedVerses({
        book: book!,
        chapter: parseInt(chapter || '1'),
      }),
    )
  }, [book, chapter, dispatch, selectedVerses.length])

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key === 'c') {
        handleCopy()
      } else if (event.key === 'Escape') {
        handleCancel()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [
    language,
    book,
    chapter,
    selectedVerses,
    chapterData,
    dispatch,
    handleCopy,
    handleCancel,
  ])

  return (
    <>
      <ActionBar.Root open={selectedVerses.length > 0}>
        <Portal>
          <ActionBar.Positioner>
            <ActionBar.Content>
              <ActionBar.SelectionTrigger>
                已选中 {selectedVerses.length}
              </ActionBar.SelectionTrigger>
              <ActionBar.Separator />
              <Tooltip showArrow content="复制选中经文 Ctrl+C/Cmd+C">
                <Button variant="outline" size="sm" onClick={handleCopy}>
                  <FaRegCopy />
                  复制
                </Button>
              </Tooltip>
              <Tooltip showArrow content="清除选中经文 Esc">
                <Button variant="outline" size="sm" onClick={handleCancel}>
                  <FaRegTrashAlt />
                  清除
                </Button>
              </Tooltip>
            </ActionBar.Content>
          </ActionBar.Positioner>
        </Portal>
      </ActionBar.Root>
      <Toaster />
    </>
  )
}

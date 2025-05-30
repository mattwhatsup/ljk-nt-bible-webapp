import { useAppDispatch, useAppSelector } from '@/app/hooks'
import type { BookName } from '@/features/book/bookApi'
import { makeSelectChapter } from '@/features/book/bookSlice'
import {
  clearSelectedVerses,
  makeChapterVersesSelector,
} from '@/features/choosen/choosenSlice'
import {
  _T,
  selectAfterNavigateKeepSelection,
  setAfterNavigateKeepSelection,
  useColorPalette,
  useLanguage,
  useT,
  useUiSizeClassName,
} from '@/features/settings/settingsSlice'
import { copyToClipboard, getSelectedVersesText } from '@/utils/copy-utils'
import { ActionBar, Button, Portal, Checkbox } from '@chakra-ui/react'
import { useCallback, useEffect } from 'react'
import { FaRegCopy, FaRegTrashAlt } from 'react-icons/fa'
import { useParams } from 'react-router-dom'
import { toaster, Toaster } from '../ui/toaster'
import { Tooltip } from '../ui/tooltip'
import { selectIsJumpToDialogOpen } from '@/features/status/statusSlice'

type Props = {}

export default function VerseActionBar({}: Props) {
  const dispatch = useAppDispatch()
  const { book, chapter } = useParams<{ book: string; chapter?: string }>()
  const language = useLanguage()
  const chapterVersesSelector = makeChapterVersesSelector(
    book!,
    parseInt(chapter || '1'),
  )
  const selectedVerses = useAppSelector(chapterVersesSelector)
  const chapterData = useAppSelector(
    makeSelectChapter(book as BookName, parseInt(chapter || '1')),
  ).contents!.nodeData
  const isJumpToDialogOpen = useAppSelector(selectIsJumpToDialogOpen)
  const afterNavigateKeepSelection = useAppSelector(
    selectAfterNavigateKeepSelection,
  )

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
          title: _T(
            [
              `已复制 ${selectedVerses.length} 节经文`,
              `已複製 ${selectedVerses.length} 節經文`,
            ],
            language,
          ),
          type: 'success',
        })
      })
      .catch(() => {
        toaster.create({
          title: _T(['复制失败', '複製失敗'], language),
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
      title: _T(
        [
          `已取消 ${selectedVerses.length} 节经文`,
          `已取消 ${selectedVerses.length} 節經文`,
        ],
        language,
      ),
      type: 'success',
    })
    dispatch(
      clearSelectedVerses({
        book: book!,
        chapter: parseInt(chapter || '1'),
      }),
    )
  }, [book, chapter, dispatch, language, selectedVerses.length])

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (isJumpToDialogOpen) return
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
    isJumpToDialogOpen,
  ])

  return (
    <>
      <ActionBar.Root open={selectedVerses.length > 0}>
        <Portal>
          <ActionBar.Positioner>
            <ActionBar.Content bgColor={`${useColorPalette()}.500`}>
              <ActionBar.SelectionTrigger
                color="white"
                fontSize={useUiSizeClassName('sm', 'button')}
              >
                {useT(['已选', '已選'])} {selectedVerses.length}
              </ActionBar.SelectionTrigger>

              <Tooltip
                showArrow
                content={useT([
                  '复制选中经文 Ctrl+C/Cmd+C',
                  '復制選中經文 Ctrl+C/Cmd+C',
                ])}
              >
                <Button
                  variant="outline"
                  // @ts-ignore
                  size={useUiSizeClassName('sm', 'button')}
                  onClick={handleCopy}
                  color="white"
                  _hover={{
                    backgroundColor: `${useColorPalette()}.400`,
                  }}
                >
                  <FaRegCopy />
                </Button>
              </Tooltip>
              <Tooltip
                showArrow
                content={useT(['"清除选中经文 Esc"', '清除選中經文 Esc'])}
              >
                <Button
                  variant="outline"
                  // @ts-ignore
                  size={useUiSizeClassName('sm', 'button')}
                  onClick={handleCancel}
                  color="white"
                  _hover={{
                    backgroundColor: `${useColorPalette()}.400`,
                  }}
                >
                  <FaRegTrashAlt />
                </Button>
              </Tooltip>

              <Checkbox.Root
                variant={'outline'}
                checked={afterNavigateKeepSelection}
                onCheckedChange={({ checked }) => {
                  dispatch(setAfterNavigateKeepSelection(!!checked))
                }}
                color="white"
                // @ts-ignore
                size={useUiSizeClassName('sm', 'control')}
              >
                <Checkbox.HiddenInput />
                <Checkbox.Control color="white" borderColor={'white'} />
                <Tooltip
                  showArrow
                  content={useT([
                    '当导航离开本页时返回仍然选中',
                    '當導航離開本頁時返回仍然選中',
                  ])}
                >
                  <Checkbox.Label>{useT(['保持', '保持'])}</Checkbox.Label>
                </Tooltip>
              </Checkbox.Root>
            </ActionBar.Content>
          </ActionBar.Positioner>
        </Portal>
      </ActionBar.Root>
      <Toaster />
    </>
  )
}

import { Box, Spinner, VStack, Text } from '@chakra-ui/react'
import { useEffect } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import BibleDisplay from '@/components/BibleDisplay/BibleDisplay'
import TurnPage from '@/components/TurnPage'
import { useAppDispatch, useAppSelector } from '@/app/hooks'
import {
  fetchChapters,
  makeSelectChapter,
  makeSelectVerseLocationValue,
} from '@/features/book/bookSlice'
import type { BookName } from '@/features/book/bookApi'
import {
  selectLanguage,
  selectShowComments,
} from '@/features/settings/settingsSlice'
import {
  clearLastSelectedVerse,
  jumpToSelectVerseThunkAction,
  selectVerseThunkAction,
} from '@/features/choosen/choosenSlice'
import { useSelector } from 'react-redux'

export default function Book() {
  const { book, chapter, verse } = useParams<{
    book: string
    chapter: string
    verse?: string
  }>()
  const dispatch = useAppDispatch()
  const selectChapter = makeSelectChapter(
    book as BookName,
    parseInt(chapter || ''),
  )
  const { contents, loading, error } = useAppSelector(selectChapter)
  const language = useAppSelector(selectLanguage)
  const showComments = useAppSelector(selectShowComments)

  const verseValue = useSelector(
    makeSelectVerseLocationValue(
      book as BookName,
      parseInt(chapter || ''),
      parseInt(verse || ''),
    ),
  )

  useEffect(() => {
    dispatch(fetchChapters({ lang: language, bookName: book as BookName }))
  }, [book, chapter, language, dispatch])

  const location = useLocation()
  useEffect(() => {
    if (!verseValue) {
      window.scrollTo(0, 0)
    } else {
      // 高亮跳转的verse
      const els = document.querySelectorAll(`[data-verse='${verseValue}']`)
      const el1 = els[0]
      if (el1) {
        el1.scrollIntoView({ behavior: 'smooth', block: 'center' })
      }

      els.forEach(el => {
        setTimeout(() => {
          el.classList.add('jumpto-emphasis')
          setTimeout(() => {
            el.classList.remove('jumpto-emphasis')
          }, 3000)
        })
      })
    }
  }, [location.pathname, verseValue])

  useEffect(() => {
    document.getElementById('custom-style')!.innerHTML = `
      .comment {
        display: ${showComments ? 'block' : 'none'};
      }
      cite {
        display: ${showComments ? 'inline' : 'none'};
      }
    `
  }, [showComments])

  // 路由带verse参数时，自动选中
  useEffect(() => {
    if (verse && contents) {
      dispatch(
        jumpToSelectVerseThunkAction({
          book: book as BookName,
          chapter: parseInt(chapter || ''),
          verse: verseValue!,
        }),
      )
    }
  }, [verse, dispatch, book, chapter, contents, verseValue])

  // 路由跳转时清除lastSelectedVerse
  useEffect(() => {
    return () => {
      dispatch(
        clearLastSelectedVerse({
          book: book!,
          chapter: parseInt(chapter || ''),
        }),
      )
    }
  }, [book, chapter, dispatch])

  return (
    <Box>
      {contents ? (
        <>
          <TurnPage />
          <BibleDisplay data={contents} />
        </>
      ) : (
        <>
          {loading && (
            <VStack colorPalette="teal">
              <Spinner color="colorPalette.600" />
              <Text color="colorPalette.600">Loading...</Text>
            </VStack>
          )}
          {error && <Text color="colorPalette.600">Error: {error}</Text>}
        </>
      )}
    </Box>
  )
}

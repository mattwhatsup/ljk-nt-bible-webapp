import {
  Box,
  Spinner,
  VStack,
  Text,
  SkeletonText,
  HStack,
} from '@chakra-ui/react'
import { useEffect, useRef } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
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
  selectAfterNavigateKeepSelection,
  selectJumpToSelect,
  selectLanguage,
  selectShowComments,
  useColorPalette,
} from '@/features/settings/settingsSlice'
import {
  clearLastSelectedVerse,
  clearSelectedVerses,
  jumpToSelectVerseThunkAction,
} from '@/features/choosen/choosenSlice'
import { sleep } from '@/utils/comm'

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
  const jumpToSelect = useAppSelector(selectJumpToSelect)
  const afterNavigateKeepSelection = useAppSelector(
    selectAfterNavigateKeepSelection,
  )

  const verseValue = useAppSelector(
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
  const navigate = useNavigate()
  const colorPalette = useColorPalette()

  useEffect(() => {
    if (!verseValue) {
      sleep(200).then(() => {
        // window.scrollTo(0, 0)
        if (location.state?.preventRender) {
          return
        }
        document
          .querySelector('.chapter-title')!
          .scrollIntoView({ behavior: 'instant', block: 'center' })
      })
    } else {
      // 高亮跳转的verse
      sleep(200).then(() => {
        const els = document.querySelectorAll(`[data-verse='${verseValue}']`)
        const el1 = els[0]
        if (el1) {
          el1.scrollIntoView({ behavior: 'smooth', block: 'center' })
        }

        els.forEach(el => {
          sleep(0)
            .then(() => {
              el.classList.add('jumpto-emphasis')
              return sleep(3000)
            })
            .then(() => {
              el.classList.remove('jumpto-emphasis')

              navigate(`/book/${book}/${chapter}`, {
                replace: true,
                preventScrollReset: true,
                state: { preventRender: true },
              })
            })
        })
      })
    }
  }, [
    location.pathname,
    verseValue,
    jumpToSelect,
    navigate,
    book,
    chapter,
    location.state?.preventRender,
  ])

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
    if (verse && contents && jumpToSelect) {
      dispatch(
        jumpToSelectVerseThunkAction({
          book: book as BookName,
          chapter: parseInt(chapter || ''),
          verse: verseValue!,
        }),
      )
    }
  }, [verse, dispatch, book, chapter, contents, verseValue, jumpToSelect])

  // 路由跳转时清除lastSelectedVerse
  const afterNavigateKeepSelectionRef = useRef(afterNavigateKeepSelection)

  useEffect(() => {
    afterNavigateKeepSelectionRef.current = afterNavigateKeepSelection
  })

  useEffect(() => {
    return () => {
      dispatch(
        clearLastSelectedVerse({
          book: book!,
          chapter: parseInt(chapter || ''),
        }),
      )

      if (!afterNavigateKeepSelectionRef.current) {
        dispatch(
          clearSelectedVerses({
            book: book!,
            chapter: parseInt(chapter || ''),
          }),
        )
      }
    }
  }, [book, chapter, dispatch])

  return (
    <Box position="relative">
      {contents ? (
        <>
          <TurnPage />
          <BibleDisplay data={contents} />
        </>
      ) : (
        <>
          {loading && (
            <VStack colorPalette={colorPalette}>
              <SkeletonText noOfLines={5} gap={4} variant={'pulse'} />
              <SkeletonText noOfLines={2} gap={4} variant={'pulse'} />
              <SkeletonText noOfLines={7} gap={4} variant={'pulse'} />
              <SkeletonText noOfLines={3} gap={4} variant={'pulse'} />
              <SkeletonText noOfLines={4} gap={4} variant={'pulse'} />
              <HStack
                position={'absolute'}
                left="50%"
                top="50%"
                transform="translate(-50%, -50%)"
              >
                <Spinner color={`${colorPalette}.600`} />
                <Text color={`${colorPalette}.600`}>Loading...</Text>
              </HStack>
            </VStack>
          )}
          {error && <Text color={`${colorPalette}.600`}>Error: {error}</Text>}
        </>
      )}
    </Box>
  )
}

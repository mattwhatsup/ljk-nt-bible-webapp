import { Box, Spinner, VStack, Text } from '@chakra-ui/react'
import { useEffect } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import BibleDisplay from '@/components/BibleDisplay/BibleDisplay'
import TurnPage from '@/components/TurnPage'
import { useAppDispatch, useAppSelector } from '@/app/hooks'
import { fetchChapters, makeSelectChapter } from '@/features/book/bookSlice'
import type { BookName } from '@/features/book/bookApi'
import {
  selectLanguage,
  selectShowComments,
} from '@/features/settings/settingsSlice'

export default function Book() {
  const { book, chapter } = useParams<{ book: string; chapter?: string }>()
  const dispatch = useAppDispatch()
  const selectChapter = makeSelectChapter(
    book as BookName,
    parseInt(chapter || ''),
  )
  const { contents, loading, error } = useAppSelector(selectChapter)
  const language = useAppSelector(selectLanguage)
  const showComments = useAppSelector(selectShowComments)

  useEffect(() => {
    dispatch(fetchChapters({ lang: language, bookName: book as BookName }))
  }, [book, chapter, language, dispatch])

  const location = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [location.pathname])

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

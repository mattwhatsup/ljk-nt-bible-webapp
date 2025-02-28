import { Box, Spinner, VStack, Text, useSelect } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import axios from 'axios'
import type { BibleItemNode } from '@/scripts/includes/chapter-parser'
import BibleDisplay from '@/components/BibleDisplay/BibleDisplay'
import TurnPage from '@/components/TurnPage'
import { useAppDispatch, useAppSelector } from '@/app/hooks'
import { fetchChapters, makeSelectChapter } from '@/features/book/bookSlice'
import type { BookName } from '@/features/book/bookApi'

export default function Book() {
  const { book, chapter } = useParams<{ book: string; chapter?: string }>()
  const dispatch = useAppDispatch()
  const selectChapter = makeSelectChapter(
    'cn',
    book as BookName,
    parseInt(chapter || ''),
  )
  const { contents, loading, error } = useAppSelector(selectChapter)

  useEffect(() => {
    dispatch(fetchChapters({ lang: 'cn', bookName: book as BookName }))
  }, [book, chapter, dispatch])

  const location = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [location.pathname])

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

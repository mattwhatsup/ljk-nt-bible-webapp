import { Box, Spinner, VStack, Text } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import type { BibleItemNode } from '@/scripts/includes/chapter-parser'
import BibleDisplay from '@/components/BibleDisplay/BibleDisplay'
import TurnPage from '@/components/TurnPage'

type Props = {}

export default function Book({}: Props) {
  const { book, chapter } = useParams<{ book: string; chapter?: string }>()
  const [contents, setContents] = useState<BibleItemNode[]>()

  useEffect(() => {
    const fetchData = async () => {
      const chapters = await (
        await axios.get<BibleItemNode[][]>(`/resources/cn-${book}.json`)
      ).data
      setContents(chapters[(parseInt(chapter || '') || 1) - 1])
    }

    fetchData()
  }, [book, chapter])

  return (
    <Box>
      <TurnPage />
      {contents ? (
        <BibleDisplay data={contents} />
      ) : (
        <VStack colorPalette="teal">
          <Spinner color="colorPalette.600" />
          <Text color="colorPalette.600">Loading...</Text>
        </VStack>
      )}
    </Box>
  )
}

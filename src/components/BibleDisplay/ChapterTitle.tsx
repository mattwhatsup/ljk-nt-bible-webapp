import type { BookChapterNode } from '@/scripts/includes/chapter-parser'
import { Heading } from '@chakra-ui/react'

type Props = {
  data: BookChapterNode
}

export default function ChapterTitle({ data }: Props) {
  return (
    <Heading
      className="chapter-title"
      fontSize={'1.6em'}
      lineHeight={'2em'}
      textAlign={'center'}
    >
      第{data.chapterIndex}章
    </Heading>
  )
}

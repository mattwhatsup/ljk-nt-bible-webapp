import type { BookChapterNode } from '@/scripts/includes/chapter-parser'
import { Heading } from '@chakra-ui/react'

type Props = {
  data: BookChapterNode
}

export default function ChapterTitle({ data }: Props) {
  return (
    <Heading
      className="chapter-title"
      fontSize={'2.2em'}
      // lineHeight={'2em'}
      paddingTop={'0.5em'}
      textAlign={'center'}
    >
      第 {data.chapterIndex} 章
    </Heading>
  )
}

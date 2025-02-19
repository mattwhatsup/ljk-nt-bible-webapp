import type { CommentNode } from '@/scripts/includes/chapter-parser'
import { Text } from '@chakra-ui/react'

type Props = {
  data: CommentNode
}

export default function Comment({ data }: Props) {
  return (
    <Text
      dangerouslySetInnerHTML={{ __html: data.contents.join('') }}
      className="comment"
    ></Text>
  )
}

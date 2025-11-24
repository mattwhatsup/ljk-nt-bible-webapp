import type { CommentNode } from '@/scripts/includes/chapter-parser'
import { Text } from '@chakra-ui/react'

type Props = {
  data: CommentNode
  noHidden: boolean
}

export default function Comment({ data, noHidden }: Props) {
  return (
    <Text
      dangerouslySetInnerHTML={{ __html: data.contents.join('') }}
      className={`comment ${noHidden ? 'no-hidden' : ''}`}
    ></Text>
  )
}

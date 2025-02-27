import { Text } from '@chakra-ui/react'

type Props = {
  content: string
  verse?: string
}

export default function Line({ content, verse }: Props) {
  return (
    <Text
      dangerouslySetInnerHTML={{ __html: content }}
      as="span"
      data-verse={verse}
      className="verse-line"
    />
  )
}

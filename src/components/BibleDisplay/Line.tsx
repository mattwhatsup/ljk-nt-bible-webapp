import { Text } from '@chakra-ui/react'

type Props = {
  content: string
  verse?: string
  selected: boolean
}

export default function Line({ content, verse, selected }: Props) {
  return (
    <Text
      dangerouslySetInnerHTML={{ __html: content }}
      as="span"
      data-verse={verse}
      className={`verse-line ${selected ? 'selected' : ''}`}
    />
  )
}

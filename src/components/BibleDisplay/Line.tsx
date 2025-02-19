import { Text } from '@chakra-ui/react'

type Props = {
  content: string
}

export default function Line({ content }: Props) {
  return <Text dangerouslySetInnerHTML={{ __html: content }} as="span" />
}

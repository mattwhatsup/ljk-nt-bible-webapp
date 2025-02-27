import { Text } from '@chakra-ui/react'
import type React from 'react'

type Props = React.PropsWithChildren<{}>
export default function Paragraph({ children }: Props) {
  return (
    <Text as={'p'} className="para">
      {children}
    </Text>
  )
}

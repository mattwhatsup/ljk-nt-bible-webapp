import { Text } from '@chakra-ui/react'
import type React from 'react'

type Props = React.PropsWithChildren<{
  otherClassNames?: string
}>
export default function Paragraph({ children, otherClassNames }: Props) {
  return (
    <Text as={'p'} className={`para ${otherClassNames || ''}`}>
      {children}
    </Text>
  )
}

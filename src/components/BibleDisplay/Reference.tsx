import { Box } from '@chakra-ui/react'
import type React from 'react'

type Props = React.PropsWithChildren<{}>

export default function Reference({ children }: Props) {
  return (
    <Box ml={8} className="ot-refs">
      {children}
    </Box>
  )
}

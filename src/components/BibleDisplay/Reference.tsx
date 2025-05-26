import { Box } from '@chakra-ui/react'
import type React from 'react'

type Props = React.PropsWithChildren<{}>

export default function Reference({ children }: Props) {
  return <Box className="ot-refs">{children}</Box>
}

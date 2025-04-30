import { useColorPalette } from '@/features/settings/settingsSlice'
import { Box } from '@chakra-ui/react'
import type { FunctionComponent, MouseEvent } from 'react'

interface BibleSelectorItemProps {
  label: string | number
  active: boolean
  onClick: (event: MouseEvent<HTMLElement>) => void
}

const BibleSelectorItem: FunctionComponent<BibleSelectorItemProps> = ({
  label,
  active,
  onClick,
}) => {
  return (
    <Box
      as="li"
      className={`${active ? 'active' : ''}`}
      _hover={{
        backgroundColor: `${useColorPalette()}.50`,
      }}
      onClick={onClick}
    >
      <span>{label}</span>
    </Box>
  )
}

export default BibleSelectorItem

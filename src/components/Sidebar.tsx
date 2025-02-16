import { Box, Button, VStack } from '@chakra-ui/react'
import { IconButton } from '@chakra-ui/react'
import { CgReadme } from 'react-icons/cg'
import { GoInfo } from 'react-icons/go'
import { BsAt } from 'react-icons/bs'
import { FiImage } from 'react-icons/fi'

type Props = {}

const sidebarStyles = {
  position: 'fixed',
  top: '0',
  left: '0',
  height: '100vh',
  width: '60px',
  backgroundColor: 'gray.200',
  padding: '4',
}

const buttonStyles = {
  color: 'black',
  backgroundColor: 'transparent',
  borderRadius: '0',
  opacity: '0.6',
  border: '4px solid transparent',
  _hover: { opacity: '1', borderLeft: '4px solid black' },
  _active: { opacity: '1' },
  style: {
    height: 'var(--chakra-sizes-14)',
    width: 'var(--chakra-sizes-16)',
  },
}

const iconStyles = {
  width: 'var(--chakra-sizes-7)',
  height: 'var(--chakra-sizes-7)',
}
export default function Sidebar({}: Props) {
  return (
    <>
      <Box {...sidebarStyles} hideBelow={'sm'}>
        <VStack gap={0}>
          <IconButton aria-label="Open Bible" {...buttonStyles}>
            <CgReadme style={iconStyles} />
          </IconButton>
          <IconButton aria-label="Info" {...buttonStyles}>
            <GoInfo style={iconStyles} />
          </IconButton>
          <IconButton aria-label="Mention" {...buttonStyles}>
            <BsAt style={iconStyles} />
          </IconButton>
          <IconButton aria-label="Images" {...buttonStyles}>
            <FiImage style={iconStyles} />
          </IconButton>
        </VStack>
      </Box>
    </>
  )
}

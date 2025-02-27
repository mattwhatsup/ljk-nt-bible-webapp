import { Icon, IconButton } from '@chakra-ui/react'
import React from 'react'
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa'

type Props = {}

export default function TurnPage({}: Props) {
  return (
    <>
      <IconButton
        rounded={'full'}
        variant={'outline'}
        position={'fixed'}
        md={{
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -0%) translateX(-22.5rem)',
        }}
        mdDown={{
          top: '50%',
          left: '0',
        }}
        size={{ mdDown: 'xs', md: 'md' }}
        bg={'white'}
        _hover={{ bg: 'gray.100' }}
      >
        <FaAngleLeft />
      </IconButton>
      <IconButton
        rounded={'full'}
        variant={'outline'}
        position={'fixed'}
        md={{
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -0%) translateX(22.55rem)',
        }}
        mdDown={{
          top: '50%',
          right: '0',
        }}
        size={{ mdDown: 'xs', md: 'md' }}
        bg={'white'}
        _hover={{ bg: 'gray.100' }}
      >
        <FaAngleRight />
      </IconButton>
    </>
  )
}

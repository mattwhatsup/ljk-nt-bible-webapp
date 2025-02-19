import { Box, Text } from '@chakra-ui/react'
import { Switch } from './ui/switch'
import BibleSelector from '@/components/BibleSelector/BibleSelector'
import { useState } from 'react'
import type { SelectValue } from './BibleSelector/BibleDropDown'

type Props = {}

export default function BookNav({}: Props) {
  const [selected, setSelected] = useState<SelectValue>()
  return (
    <Box
      as="header"
      display={'flex'}
      py={4}
      pt={20}
      position={'fixed'}
      width={'full'}
      bg={'teal.500'}
      justifyContent={'center'}
      zIndex={99}
    >
      <Box width={'2xl'} display={'flex'} justifyContent={'space-between'}>
        <BibleSelector
          selected={selected}
          onChange={selected => {
            console.log(selected)
            setSelected(selected)
          }}
        />

        <Box>
          <Switch colorPalette={'blue'} defaultChecked mr={1} color={'white'}>
            显示注释
          </Switch>
        </Box>
      </Box>
    </Box>
  )
}

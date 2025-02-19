import type { FunctionComponent, ReactElement } from 'react'
import { cloneElement } from 'react'
import { Box, Button, PopoverCloseTrigger } from '@chakra-ui/react'
import {
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverRoot,
  PopoverTrigger,
} from '@/components/ui/popover'
import BibleSelectorPanelCloser from './BibleSelectorPanelCloser'

interface BibleDropDownProps {
  label: String
  children: ReactElement
}

export enum SelectType {
  Book,
  Chapter,
  Verse,
}

export type SelectValue = {
  book?: string
  chapter?: number
  verse?: number
}

export interface BibleSelectorProps {
  selectType: SelectType
  onClose?: Function
}

const BibleDropDown: FunctionComponent<
  BibleDropDownProps & BibleSelectorProps
> = ({ label, children, ...selectorProps }) => {
  return (
    <PopoverRoot positioning={{ placement: 'bottom-start' }} modal>
      <PopoverTrigger asChild>
        <Button
          size="sm"
          variant="plain"
          focusRing={'none'}
          color={'whiteAlpha.800'}
          _hover={{
            textDecoration: 'underline',
            textUnderlineOffset: '2px',
            textDecorationColor: 'black.400',
            textDecorationThickness: '2px',
            color: 'white',
          }}
        >
          {label}
        </Button>
      </PopoverTrigger>
      <PopoverContent width={'unset'}>
        {/* 取消Chakra UI的Popover的默认宽度 */}
        <PopoverArrow />
        <PopoverBody>
          <Box position={'relative'}>
            <PopoverCloseTrigger>
              <BibleSelectorPanelCloser />
            </PopoverCloseTrigger>
            {cloneElement(children, selectorProps)}
          </Box>
        </PopoverBody>
      </PopoverContent>
    </PopoverRoot>
  )
}

export default BibleDropDown

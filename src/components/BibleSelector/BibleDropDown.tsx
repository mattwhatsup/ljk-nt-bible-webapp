import type { FunctionComponent, ReactElement } from 'react'
import { cloneElement } from 'react'
import { Popover, Transition } from '@headlessui/react'
import { Button, Text } from '@chakra-ui/react'
import {
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverRoot,
  PopoverTitle,
  PopoverTrigger,
} from '@/components/ui/popover'

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
  book?: number
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
        <Button size="sm" variant="outline">
          Click me
        </Button>
      </PopoverTrigger>
      <PopoverContent width={'unset'}>
        {/* 取消Chakra UI的Popover的默认宽度 */}
        <PopoverBody>{cloneElement(children, selectorProps)}</PopoverBody>
      </PopoverContent>
    </PopoverRoot>
  )
}

export default BibleDropDown

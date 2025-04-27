import type { FunctionComponent, ReactElement } from 'react'
import { cloneElement, useContext, useEffect, useRef } from 'react'
import {
  Box,
  Button,
  PopoverCloseTrigger,
  useBreakpointValue,
  Drawer,
  Portal,
  CloseButton,
} from '@chakra-ui/react'
import {
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverRoot,
  PopoverTrigger,
} from '@/components/ui/popover'
import BibleSelectorPanelCloser from './BibleSelectorPanelCloser'
import { BibleSelectorContext } from './BibleSelectorContextProvider'
import { SelectedValueContext } from './BibleSelector'
import { isSelectedValueComplete } from './utils'
import { useT } from '@/features/settings/settingsSlice'

interface BibleDropDownProps {
  label: String
  children: ReactElement
  onClose?: Function
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
> = ({ label, children, onClose, selectType, ...selectorProps }) => {
  const { selected } = useContext(SelectedValueContext)!
  const { showVerseSelector } = useContext(BibleSelectorContext)!
  const closeTriggerRef = useRef<HTMLButtonElement>(null)
  useEffect(() => {
    if (
      closeTriggerRef.current &&
      isSelectedValueComplete(selected!, showVerseSelector)
    ) {
      closeTriggerRef.current.click()
    }
  }, [selected, showVerseSelector])
  const isMobile = useBreakpointValue({ base: true, maxContent: false })

  const popover = (
    <PopoverRoot
      positioning={{ placement: 'bottom-start' }}
      modal
      onExitComplete={() => {
        onClose?.()
      }}
      unmountOnExit
    >
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
            <PopoverCloseTrigger ref={closeTriggerRef}>
              <BibleSelectorPanelCloser />
            </PopoverCloseTrigger>
            {cloneElement(children, selectorProps)}
          </Box>
        </PopoverBody>
      </PopoverContent>
    </PopoverRoot>
  )
  const drawer = (
    <Drawer.Root size={'sm'} onExitComplete={() => onClose?.()} unmountOnExit>
      <Drawer.Trigger asChild>
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
      </Drawer.Trigger>
      <Portal>
        <Drawer.Backdrop />
        <Drawer.Positioner>
          <Drawer.Content animationDuration={'0.1s'}>
            <Drawer.Header>
              <Drawer.Title>
                {useT(['选择书卷和章', '選擇書卷和章'])}
              </Drawer.Title>
            </Drawer.Header>
            <Drawer.Body display={'flex'} flexDirection={'column'}>
              {cloneElement(children, {
                ...selectorProps,
                tabView: selectType === SelectType.Book ? 'books' : 'chapters',
              })}
            </Drawer.Body>

            <Drawer.CloseTrigger asChild ref={closeTriggerRef}>
              <CloseButton size="sm" />
            </Drawer.CloseTrigger>
          </Drawer.Content>
        </Drawer.Positioner>
      </Portal>
    </Drawer.Root>
  )
  return isMobile ? drawer : popover
}

export default BibleDropDown

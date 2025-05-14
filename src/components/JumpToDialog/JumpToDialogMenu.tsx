import type { RefObject } from 'react'
import { MenuContent, MenuItem, MenuRoot } from '@/components/ui/menu'
import {
  getUiSizeClassName,
  useUiSize,
  useUiSizeClassName,
} from '@/features/settings/settingsSlice'

type Props = {
  portalRef: RefObject<HTMLElement>
  anchorRef: RefObject<HTMLElement>
  selectedValue?: string
  items: { label: string; value: string }[]
  onSelect?: (value: string) => void
}

export default function JumpToDialogMenu({
  portalRef,
  anchorRef,
  selectedValue,
  items,
  onSelect,
}: Props) {
  const uiSize = useUiSize()
  return (
    <MenuRoot
      positioning={{
        sameWidth: true,
        listeners: true,
        getAnchorRect() {
          return anchorRef.current!.getBoundingClientRect()
        },
      }}
      highlightedValue={selectedValue}
      open={items.length > 0}
    >
      <MenuContent portalRef={portalRef} maxH={'10rem'}>
        {items.map(item => (
          <MenuItem
            value={item.value}
            key={item.value}
            onClick={() => {
              onSelect?.(item.value)
            }}
            fontSize={getUiSizeClassName('md', uiSize, 'control')}
          >
            {item.label}
          </MenuItem>
        ))}
      </MenuContent>
    </MenuRoot>
  )
}

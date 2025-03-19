import type { RefObject } from 'react'
import { MenuContent, MenuItem, MenuRoot } from '@/components/ui/menu'

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
      size={'md'}
    >
      <MenuContent portalRef={portalRef} maxH={'10rem'}>
        {items.map(item => (
          <MenuItem
            value={item.value}
            key={item.value}
            onClick={() => {
              onSelect?.(item.value)
            }}
          >
            {item.label}
          </MenuItem>
        ))}
      </MenuContent>
    </MenuRoot>
  )
}

import { useAppDispatch, useAppSelector } from '@/app/hooks'
import {
  closeJumpToDialog,
  openJumpToDialog,
  selectIsJumpToDialogOpen,
} from '@/features/status/statusSlice'
import {
  CloseButton,
  Dialog,
  Field,
  Input,
  Portal,
  Stack,
} from '@chakra-ui/react'
import { useEffect, useRef, useState } from 'react'
import JumpToDialogMenu from './JumpToDialogMenu'
import { makeSearchResults, parseSearch } from './utils'
import { useNavigate } from 'react-router-dom'
type Props = {}

export default function JumpToDialog({}: Props) {
  const dispatch = useAppDispatch()
  const open = useAppSelector(selectIsJumpToDialogOpen)
  const ref = useRef<HTMLInputElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const [list, setList] = useState<{
    selectedIndex: number
    items: { label: string; value: string }[]
  }>({ selectedIndex: 0, items: [] })

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'j') {
        event.preventDefault()
        dispatch(openJumpToDialog())
      }

      if (event.key.toLowerCase() === 'escape') {
        event.preventDefault()
        dispatch(closeJumpToDialog())
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [dispatch])

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      event.preventDefault() // 这会阻止光标移动
    }
  }

  const handleKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'ArrowDown') {
      let nextIndex = list.selectedIndex + 1
      if (nextIndex >= list.items.length) {
        nextIndex = 0
      }
      setList({ ...list, selectedIndex: nextIndex })
    } else if (event.key === 'ArrowUp') {
      let nextIndex = list.selectedIndex - 1
      if (nextIndex < 0) {
        nextIndex = list.items.length - 1
      }
      setList({ ...list, selectedIndex: nextIndex })
    } else if (event.key === 'Enter') {
      event.preventDefault()
      dispatch(closeJumpToDialog())
      jumpTo(list.items[list.selectedIndex].value)
    } else {
      const value = event.currentTarget.value
      if (value.trim() === '') {
        setList({ selectedIndex: 0, items: [] })
        return
      }
      const search = parseSearch(value)!
      const items = makeSearchResults(
        search.bookFilter,
        search.chapter,
        search.verse,
      ).map(result => ({
        label: `${result.name_cn} ${result.chapter}:${result.verse}`,
        value: `${result.abbr} ${result.chapter} ${result.verse}`,
      }))

      setList({ selectedIndex: 0, items })
    }
  }

  const navigate = useNavigate()

  const jumpTo = (value: string) => {
    const [abbr, chapter, verse] = value.split(' ')
    const path = `/book/${abbr}/${chapter}/${verse}`
    navigate(path)
  }

  return (
    <Dialog.Root
      initialFocusEl={() => ref.current}
      open={open}
      onExitComplete={() => {
        setList({ selectedIndex: 0, items: [] })
      }}
    >
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content ref={contentRef}>
            <Dialog.Header>
              <Dialog.Title>快速跳转</Dialog.Title>
            </Dialog.Header>
            <Dialog.Body pb="4">
              <Stack gap="4">
                <Field.Root>
                  <Input
                    ref={ref}
                    placeholder="输入查询"
                    onKeyUp={handleKeyUp}
                    onKeyDown={handleKeyDown}
                    onBlur={() => {
                      ref.current?.focus()
                    }}
                  />
                </Field.Root>
                {
                  <JumpToDialogMenu
                    portalRef={contentRef}
                    anchorRef={ref}
                    items={list.items}
                    selectedValue={list.items[list.selectedIndex]?.value}
                    onSelect={s => {
                      dispatch(closeJumpToDialog())
                      jumpTo(s)
                    }}
                  />
                }
              </Stack>
            </Dialog.Body>

            <Dialog.CloseTrigger asChild>
              <CloseButton
                size="sm"
                onClick={() => dispatch(closeJumpToDialog())}
              />
            </Dialog.CloseTrigger>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  )
}

import { useAppDispatch, useAppSelector } from '@/app/hooks'
import {
  closeJumpToDialog,
  openJumpToDialog,
  selectIsJumpToDialogOpen,
} from '@/features/status/statusSlice'
import {
  Checkbox,
  CloseButton,
  Dialog,
  Field,
  Input,
  Portal,
  Stack,
} from '@chakra-ui/react'
import { useEffect, useRef, useState } from 'react'
import JumpToDialogMenu from './JumpToDialogMenu'
import {
  makeAmbiguouslySearchResults,
  makePreciselySearchResults,
  parseSearch,
} from './utils'
import { useNavigate, useParams } from 'react-router-dom'
import {
  selectJumpToSelect,
  setJumpToSelect,
  useLanguage,
  useT,
} from '@/features/settings/settingsSlice'
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
  const jumpToSelect = useAppSelector(selectJumpToSelect)
  const { book: currentBook } = useParams<{
    book: string
    chapter?: string
  }>()
  const language = useLanguage()

  // 唤醒/关闭 快速跳转窗口
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
        setList({ selectedIndex: 0, items: [] }) // 重制初始值
        return
      }
      const search = parseSearch(value)!
      const items = (() => {
        if (search.partial?.bookFilter === '[current]' && currentBook) {
          search.partial.bookFilter = currentBook
          return makePreciselySearchResults(
            search.partial.bookFilter,
            search.partial.chapter,
            search.partial.verse,
          )
        } else {
          return makeAmbiguouslySearchResults(
            search.full!.bookFilter,
            search.full!.chapter,
            search.full!.verse,
          )
        }
      })().map(result => ({
        label: `${result[`name_${language}`]} ${result.chapter}章${result.verse > 0 ? `${result.verse}节` : ''}`,
        value: `${result.abbr} ${result.chapter} ${result.verse > 0 ? `${result.verse}` : ''}`,
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
      onPointerDownOutside={() => {
        dispatch(closeJumpToDialog())
      }}
    >
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content ref={contentRef}>
            <Dialog.Header>
              <Dialog.Title>{useT(['快速跳转', '快速跳轉'])}</Dialog.Title>
            </Dialog.Header>
            <Dialog.Body pb="4">
              <Stack gap="4">
                <Field.Root>
                  <Checkbox.Root
                    variant={'outline'}
                    checked={jumpToSelect}
                    onCheckedChange={({ checked }) => {
                      dispatch(setJumpToSelect(!!checked))
                    }}
                  >
                    <Checkbox.HiddenInput />
                    <Checkbox.Control />
                    <Checkbox.Label>
                      {useT([
                        '跳转指定某一节时，直接选中该节经文',
                        '跳轉指定某一節時，直接選中該節經文',
                      ])}
                    </Checkbox.Label>
                  </Checkbox.Root>
                </Field.Root>
                <Field.Root>
                  <Input
                    ref={ref}
                    placeholder={useT([
                      '输入格式：书 章:节，书名可输入部分中英文自动匹配，如 mt 28 13',
                      '輸入格式：書 章:節，書名可輸入部分中英文自動匹配，如 mt 28 13',
                    ])}
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
                      console.log(s)
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

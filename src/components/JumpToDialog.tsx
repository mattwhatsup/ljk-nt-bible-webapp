import { useAppDispatch, useAppSelector } from '@/app/hooks'
import {
  closeJumpToDialog,
  openJumpToDialog,
  selectIsJumpToDialogOpen,
} from '@/features/status/statusSlice'
import {
  Button,
  CloseButton,
  Dialog,
  Field,
  Input,
  Portal,
  Stack,
} from '@chakra-ui/react'
import { useEffect, useRef } from 'react'
import type { SelectInstance } from 'react-select'
import type { ColourOption } from './JumpToSearchInput'
import JumpToSearchInput from './JumpToSearchInput'
type Props = {}

export default function JumpToDialog({}: Props) {
  const dispatch = useAppDispatch()
  const open = useAppSelector(selectIsJumpToDialogOpen)
  const selectRef = useRef<SelectInstance<ColourOption>>(null)

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

  return (
    // @ts-ignore
    <Dialog.Root initialFocusEl={() => selectRef.current} open={open}>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header>
              <Dialog.Title>快速跳转</Dialog.Title>
            </Dialog.Header>
            <Dialog.Body pb="4">
              <Stack gap="4">
                <Field.Root>
                  <Field.Label>查询：</Field.Label>
                  <JumpToSearchInput ref={selectRef} />
                </Field.Root>
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

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
type Props = {}

export default function JumpToDialog({}: Props) {
  const dispatch = useAppDispatch()
  const open = useAppSelector(selectIsJumpToDialogOpen)
  const ref = useRef<HTMLInputElement>(null)

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
    // <Dialog.RootProvider
    //   value={dialog}
    //   onExitComplete={() => dispatch(closeJumpToDialog())}
    // >
    <Dialog.Root initialFocusEl={() => ref.current} open={open}>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header>
              <Dialog.Title>Dialog Title</Dialog.Title>
            </Dialog.Header>
            <Dialog.Body pb="4">
              <Stack gap="4">
                <Field.Root>
                  <Field.Label>First Name</Field.Label>
                  <Input placeholder="First Name" />
                </Field.Root>
                <Field.Root>
                  <Field.Label>Last Name</Field.Label>
                  <Input ref={ref} placeholder="Focus First" />
                </Field.Root>
              </Stack>
            </Dialog.Body>
            <Dialog.Footer justifyContent="center">
              <Dialog.ActionTrigger asChild>
                <Button
                  variant="outline"
                  onClick={() => dispatch(closeJumpToDialog())}
                >
                  Cancel
                </Button>
              </Dialog.ActionTrigger>
              <Button>Save</Button>
            </Dialog.Footer>
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
    // </Dialog.RootProvider>
  )
}

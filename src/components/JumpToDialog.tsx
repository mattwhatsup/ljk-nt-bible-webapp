import { useAppDispatch } from '@/app/hooks'
import {
  closeJumpToDialog,
  openJumpToDialog,
} from '@/features/status/statusSlice'
import {
  Button,
  CloseButton,
  Dialog,
  Portal,
  useDialog,
} from '@chakra-ui/react'
import { useEffect } from 'react'
type Props = {}

export default function JumpToDialog({}: Props) {
  const dialog = useDialog()
  const dispatch = useAppDispatch()

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'j') {
        event.preventDefault()
        dialog.setOpen(true)
        dispatch(openJumpToDialog())
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [dialog, dispatch])

  return (
    <Dialog.RootProvider
      value={dialog}
      onExitComplete={() => dispatch(closeJumpToDialog())}
    >
      {/* <Dialog.Trigger asChild>
        <Button variant="outline" size="sm">
          {dialog.open ? 'Close' : 'Open'} Dialog
        </Button>
      </Dialog.Trigger> */}
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header>
              <Dialog.Title>Dialog Title</Dialog.Title>
            </Dialog.Header>
            <Dialog.Body>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
            </Dialog.Body>
            <Dialog.Footer justifyContent="center">
              <Dialog.ActionTrigger asChild>
                <Button variant="outline">Cancel</Button>
              </Dialog.ActionTrigger>
              <Button>Save</Button>
            </Dialog.Footer>
            <Dialog.CloseTrigger asChild>
              <CloseButton size="sm" />
            </Dialog.CloseTrigger>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.RootProvider>
  )
}

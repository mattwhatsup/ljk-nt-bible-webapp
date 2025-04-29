import { useLocation, useNavigate } from 'react-router-dom'
import {
  AspectRatio,
  Button,
  CloseButton,
  Dialog,
  Portal,
} from '@chakra-ui/react'

type Props = {}

function Content({}: Props) {
  return <div>Settings Content</div>
}
export default function Settings({}: Props) {
  const location = useLocation()
  const state = location.state as { backgroundLocation?: Location }
  const navigate = useNavigate()

  if (!state?.backgroundLocation) {
    return <Content />
  } else {
    return (
      <Dialog.Root
        placement="top"
        defaultOpen={true}
        onExitComplete={() => {
          navigate(-1)
        }}
        restoreFocus={false}
        size={'md'}
        motionPreset={'slide-in-top'}
      >
        <Portal>
          <Dialog.Backdrop />
          <Dialog.Positioner>
            <Dialog.Content>
              <Dialog.Body pt="4">
                <Dialog.Title>Dialog Title</Dialog.Title>
                <Dialog.Description mb="4">
                  This is a dialog with some content and a video.
                </Dialog.Description>
                <Content />
              </Dialog.Body>
              <Dialog.CloseTrigger asChild>
                <CloseButton bg="bg" size="sm" />
              </Dialog.CloseTrigger>
            </Dialog.Content>
          </Dialog.Positioner>
        </Portal>
      </Dialog.Root>
    )
  }
}

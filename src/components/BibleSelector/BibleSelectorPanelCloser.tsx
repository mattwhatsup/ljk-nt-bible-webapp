import { Icon } from '@chakra-ui/react'
import type { FunctionComponent } from 'react'
import { FaRectangleXmark } from 'react-icons/fa6'

interface BibleSelectorPanelCloserProps {
  onClose?: Function
}

const BibleSelectorPanelCloser: FunctionComponent<
  BibleSelectorPanelCloserProps
> = ({ onClose }) => {
  return (
    <Icon
      id="close-trigger"
      position={'absolute'}
      right={'0.5rem'}
      color={'gray.400'}
      fontSize={'xs'}
      cursor={'pointer'}
      zIndex={1}
      onClick={() => {
        onClose?.()
      }}
    >
      <FaRectangleXmark />
    </Icon>
  )
}

export default BibleSelectorPanelCloser

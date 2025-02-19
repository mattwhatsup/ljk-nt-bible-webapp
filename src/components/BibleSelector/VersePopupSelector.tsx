import type { FunctionComponent, HTMLAttributes } from 'react'
import VerseList from './VerseList'
import type { BibleSelectorProps } from './BibleDropDown'
import { Box } from '@chakra-ui/react'

interface VersePopupSelectorProps extends HTMLAttributes<HTMLDivElement> {}

const VersePopupSelector: FunctionComponent<
  VersePopupSelectorProps & Partial<BibleSelectorProps>
> = ({ className, onClose }) => {
  return (
    <Box position={'relative'} rounded={'md'} width={'13rem'}>
      <VerseList className="flex-1 ml-2" closeHandler={onClose} />
    </Box>
  )
}

export default VersePopupSelector

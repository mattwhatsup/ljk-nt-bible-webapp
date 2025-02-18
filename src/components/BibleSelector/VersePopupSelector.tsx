import { FunctionComponent, HTMLAttributes } from 'react'
import VerseList from './VerseList'
import { BibleSelectorProps } from './BibleDropDown'
import BibleSelectorPanelCloser from './BibleSelectorPanelCloser'

interface VersePopupSelectorProps extends HTMLAttributes<HTMLDivElement> {}

const VersePopupSelector: FunctionComponent<
  VersePopupSelectorProps & Partial<BibleSelectorProps>
> = ({ className, onClose }) => {
  return (
    <div
      className={
        'pop lt bg-white p-2 flex w-[13rem] relative rounded-md ' + className
      }
    >
      <BibleSelectorPanelCloser onClose={onClose} />
      <VerseList className="flex-1 ml-2" closeHandler={onClose} />
    </div>
  )
}

export default VersePopupSelector

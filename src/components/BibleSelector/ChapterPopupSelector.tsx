import { FunctionComponent, HTMLAttributes, useContext } from 'react'
import ChapterList from './ChapterList'
import VerseList from './VerseList'
import './BibleSelector.css'
import { BibleSelectorProps } from './BibleDropDown'
import BibleSelectorPanelCloser from './BibleSelectorPanelCloser'
import { SelectedValueContext } from '.'

interface ChapterPopupSelectorProps extends HTMLAttributes<HTMLDivElement> {}

const ChapterPopupSelector: FunctionComponent<
  ChapterPopupSelectorProps & Partial<BibleSelectorProps>
> = ({ className, onClose }) => {
  const { selected } = useContext(SelectedValueContext)!

  const cols = 1 + (selected?.chapter ? 1 : 0)
  const widths = {
    1: 'w-[14rem]',
    2: 'w-[28rem]',
  } as Record<number, string>

  return (
    <div
      className={
        `pop lt bg-white p-2 flex ${widths[cols]} relative rounded-md ` +
        className
      }
    >
      <BibleSelectorPanelCloser onClose={onClose} />
      <ChapterList className="flex-1" />
      {selected?.chapter && (
        <VerseList className="flex-1 ml-2" closeHandler={onClose} />
      )}
    </div>
  )
}

export default ChapterPopupSelector

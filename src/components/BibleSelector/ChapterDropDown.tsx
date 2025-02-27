import type { FunctionComponent } from 'react'
import { useContext } from 'react'
import ChapterPopupSelector from './ChapterPopupSelector'
import BibleDropDown, { SelectType } from './BibleDropDown'
import { SelectedValueContext } from './BibleSelector'

interface ChapterDropDownProps {
  onClose?: Function
}

const ChapterDropDown: FunctionComponent<ChapterDropDownProps> = ({
  onClose,
}) => {
  const { selected } = useContext(SelectedValueContext)!
  const label = selected?.chapter ? `${selected.chapter}章` : '<选择章>'

  return (
    <BibleDropDown
      label={label}
      selectType={SelectType.Chapter}
      onClose={onClose}
    >
      <ChapterPopupSelector />
    </BibleDropDown>
  )
}

export default ChapterDropDown

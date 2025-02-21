import type { FunctionComponent } from 'react'
import { useContext } from 'react'
import VersePopupSelector from './VersePopupSelector'
import BibleDropDown, { SelectType } from './BibleDropDown'
import { SelectedValueContext } from './BibleSelector'

interface VerseDropDownProps {
  onClose?: Function
}

const VerseDropDown: FunctionComponent<VerseDropDownProps> = ({ onClose }) => {
  const { selected } = useContext(SelectedValueContext)!
  const label = selected?.verse ? `${selected.verse}节` : '<选择节>'

  return (
    <BibleDropDown
      label={label}
      selectType={SelectType.Verse}
      onClose={onClose}
    >
      <VersePopupSelector />
    </BibleDropDown>
  )
}

export default VerseDropDown

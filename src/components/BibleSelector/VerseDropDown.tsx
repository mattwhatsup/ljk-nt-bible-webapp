import type { FunctionComponent } from 'react'
import { useContext } from 'react'
import VersePopupSelector from './VersePopupSelector'
import BibleDropDown, { SelectType } from './BibleDropDown'
import { SelectedValueContext } from './BibleSelector'

interface VerseDropDownProps {}

const VerseDropDown: FunctionComponent<VerseDropDownProps> = () => {
  const { selected } = useContext(SelectedValueContext)!
  const label = selected?.verse ? `${selected.verse}节` : '<选择节>'

  return (
    <BibleDropDown label={label} selectType={SelectType.Verse}>
      <VersePopupSelector />
    </BibleDropDown>
  )
}

export default VerseDropDown

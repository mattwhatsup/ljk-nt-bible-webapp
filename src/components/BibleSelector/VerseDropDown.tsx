import { FunctionComponent, useContext } from 'react'
import VersePopupSelector from './VersePopupSelector'
import BibleDropDown, { SelectType } from './BibleDropDown'
import { SelectedValueContext } from '.'

interface VerseDropDownProps {}

const VerseDropDown: FunctionComponent<VerseDropDownProps> = () => {
  const { selected } = useContext(SelectedValueContext)!
  const label = selected?.verse ? `${selected.verse}节` : '<选择节>'

  return (
    <BibleDropDown label={label} selectType={SelectType.Verse}>
      <VersePopupSelector className="dropdown-menu dropdown-content block !top-[120%] shadow-lg border-gray-200" />
    </BibleDropDown>
  )
}

export default VerseDropDown

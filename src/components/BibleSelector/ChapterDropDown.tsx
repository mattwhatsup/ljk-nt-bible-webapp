import { FunctionComponent, useContext } from 'react'
import ChapterPopupSelector from './ChapterPopupSelector'
import BibleDropDown, { SelectType } from './BibleDropDown'
import { SelectedValueContext } from '.'

interface ChapterDropDownProps {}

const ChapterDropDown: FunctionComponent<ChapterDropDownProps> = () => {
  const { selected } = useContext(SelectedValueContext)!
  const label = selected?.chapter ? `${selected.chapter}章` : '<选择章>'

  return (
    <BibleDropDown label={label} selectType={SelectType.Chapter}>
      <ChapterPopupSelector className="dropdown-menu dropdown-content block !top-[120%] shadow-lg border-gray-200" />
    </BibleDropDown>
  )
}

export default ChapterDropDown

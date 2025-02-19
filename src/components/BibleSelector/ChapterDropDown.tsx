import type { FunctionComponent } from 'react'
import { useContext } from 'react'
import ChapterPopupSelector from './ChapterPopupSelector'
import BibleDropDown, { SelectType } from './BibleDropDown'
import { SelectedValueContext } from './BibleSelector'

interface ChapterDropDownProps {}

const ChapterDropDown: FunctionComponent<ChapterDropDownProps> = () => {
  const { selected } = useContext(SelectedValueContext)!
  const label = selected?.chapter ? `${selected.chapter}章` : '<选择章>'

  return (
    <BibleDropDown label={label} selectType={SelectType.Chapter}>
      <ChapterPopupSelector />
    </BibleDropDown>
  )
}

export default ChapterDropDown

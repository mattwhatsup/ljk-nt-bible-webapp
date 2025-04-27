import type { FunctionComponent } from 'react'
import { useContext } from 'react'
import ChapterPopupSelector from './ChapterPopupSelector'
import BibleDropDown, { SelectType } from './BibleDropDown'
import { SelectedValueContext } from './BibleSelector'
import { _T, useLanguage } from '@/features/settings/settingsSlice'

interface ChapterDropDownProps {
  onClose?: Function
}

const ChapterDropDown: FunctionComponent<ChapterDropDownProps> = ({
  onClose,
}) => {
  const { selected } = useContext(SelectedValueContext)!
  const language = useLanguage()
  const label = selected?.chapter
    ? `${selected.chapter}章`
    : _T(['<选择章>', '<選擇章>'], language)

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

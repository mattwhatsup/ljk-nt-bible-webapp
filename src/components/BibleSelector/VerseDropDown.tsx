import type { FunctionComponent } from 'react'
import { useContext } from 'react'
import VersePopupSelector from './VersePopupSelector'
import BibleDropDown, { SelectType } from './BibleDropDown'
import { SelectedValueContext } from './BibleSelector'
import { _T, useLanguage } from '@/features/settings/settingsSlice'

interface VerseDropDownProps {
  onClose?: Function
}

const VerseDropDown: FunctionComponent<VerseDropDownProps> = ({ onClose }) => {
  const { selected } = useContext(SelectedValueContext)!
  const language = useLanguage()
  const label = selected?.verse
    ? `${selected.verse}节`
    : _T(['<选择节>', '<選擇節>'], language)

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

import type { FunctionComponent } from 'react'
import { useContext } from 'react'
import BookPopupSelector from './BookPopupSelector'
import BibleDropDown, { SelectType } from './BibleDropDown'
import { BibleSelectorContext } from './BibleSelectorContextProvider'
import { SelectedValueContext } from './BibleSelector'
import { _T, useLanguage } from '@/features/settings/settingsSlice'

interface BookDropDownProps {
  onClose?: Function
}

const BookDropDown: FunctionComponent<BookDropDownProps> = ({ onClose }) => {
  const { books } = useContext(BibleSelectorContext)!
  const { selected } = useContext(SelectedValueContext)!
  const language = useLanguage()
  const label = selected?.book
    ? books.find(book => book.abbr_en.toLowerCase() === selected.book)![
        `name_${language === 'cn' ? 'cn' : 'tr'}`
      ]
    : _T(['<选择书>', '<選擇書>'], language)

  return (
    <BibleDropDown label={label} selectType={SelectType.Book} onClose={onClose}>
      <BookPopupSelector />
    </BibleDropDown>
  )
}

export default BookDropDown

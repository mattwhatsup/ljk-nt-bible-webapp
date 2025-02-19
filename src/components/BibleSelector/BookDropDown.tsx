import type { FunctionComponent } from 'react'
import { useContext } from 'react'
import BookPopupSelector from './BookPopupSelector'
import BibleDropDown, { SelectType } from './BibleDropDown'
import { BibleSelectorContext } from './BibleSelectorContextProvider'
import { SelectedValueContext } from './BibleSelector'

interface BookDropDownProps {}

const BookDropDown: FunctionComponent<BookDropDownProps> = () => {
  const { books } = useContext(BibleSelectorContext)!
  const { selected } = useContext(SelectedValueContext)!
  const label = selected?.book
    ? books.find(book => book.id === selected.book)!.name_cn
    : '<选择书>'

  return (
    <BibleDropDown label={label} selectType={SelectType.Book}>
      <BookPopupSelector />
    </BibleDropDown>
  )
}

export default BookDropDown

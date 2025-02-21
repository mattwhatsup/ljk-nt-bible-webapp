import allBooks from './all-books.json'
import type { SelectValue } from './BibleDropDown'

export function getBookName(bookId: number) {
  return allBooks.find(book => {
    return book.id === bookId
  })?.name_cn!
}

export function isSelectedValueComplete(
  selected: SelectValue,
  showVerseSelector: boolean,
) {
  return !!(
    selected.book &&
    selected.chapter &&
    (showVerseSelector ? selected.verse : true)
  )
}

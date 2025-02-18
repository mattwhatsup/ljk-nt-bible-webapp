import allBooks from './all-books.json'

export function getBookName(bookId: number) {
  return allBooks.find((book) => {
    return book.id === bookId
  })?.name_cn!
}

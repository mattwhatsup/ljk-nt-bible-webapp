import type { DataBook } from '../app/data-types'

export function book_filter(book: DataBook, filterText: string) {
  filterText = filterText.toLowerCase()
  return (
    book.abbr_cn.toLowerCase().includes(filterText) ||
    book.abbr_en.toLowerCase().includes(filterText) ||
    book.abbr_tr.toLowerCase().includes(filterText) ||
    book.name_cn.toLowerCase().includes(filterText) ||
    book.name_en.toLowerCase().includes(filterText) ||
    book.name_tr.toLowerCase().includes(filterText) ||
    book.pinyin.toLowerCase().includes(filterText) ||
    book.pinyin_initial.toLowerCase().includes(filterText)
  )
}

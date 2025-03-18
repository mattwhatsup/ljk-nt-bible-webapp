import allBooksJSON from '@/components/BibleSelector/all-books.json'
import chapterVerseCountMappingJSON from '@/components/BibleSelector/all-chapter-verses-count.json'
import type { DataBook, ChapterVersesCount } from '../../app/data-types'
import escapeStringRegexp from 'escape-string-regexp'

const allBooks: DataBook[] = allBooksJSON as DataBook[]
const chapterVerseCountMapping: ChapterVersesCount[] =
  chapterVerseCountMappingJSON as ChapterVersesCount[]

const standardPattern = (text: string) => {
  const regex = /([^\s]*)\s*(?:(\d*)[::\s.,]?(\d*))?/i
  const match = text.match(regex)
  if (match) {
    return {
      bookFilter: match[1],
      chapter: +match[2] || 0,
      verse: +match[3] || 0,
    }
  }
}
export const parseSearch = (text: string) => {
  const patterns = [standardPattern]

  for (let i = 0; i < patterns.length; i++) {
    const match = patterns[i](text)
    if (match) return match
  }
}

const filterBooks = (input: string, books: DataBook[]) => {
  if (!input) return books

  const chars = input.split('').map(c => escapeStringRegexp(c))

  const newFilter = chars.join('.*')

  return books.filter(book => {
    const regex = new RegExp(newFilter, 'i')

    return (
      book.name_cn.match(regex) ||
      book.name_en.match(regex) ||
      book.pinyin.match(regex) ||
      book.pinyin_initial.match(regex)
    )
  })
}

export const makeSearchResults = (
  supposeBook: string,
  supposeChapter: number,
  supposeVerse: number,
) => {
  const filteredBooks = filterBooks(
    supposeBook,
    allBooks.filter(book => book.ot_or_nt === 'Nt'),
  )
    .map(book => ({
      id: book.id,
      name_en: book.name_en,
      name_tw: book.name_tr,
      name_cn: book.name_cn,
      abbr: book.abbr_en,
      chapter: supposeChapter || 1,
      verse: supposeVerse || 1,
      chapter_count: +book.chapter_count,
    }))
    .filter(selctor => {
      return (
        selctor.chapter_count >= selctor.chapter &&
        chapterVerseCountMapping.find(
          item =>
            item.book_id === selctor.id &&
            item.chapter === selctor.chapter &&
            item.verses_count >= selctor.verse,
        )
      )
    })

  return filteredBooks.map(book => {
    return { ...book, title: `${book.name_cn} ${book.chapter}:${book.verse}` }
  })
}

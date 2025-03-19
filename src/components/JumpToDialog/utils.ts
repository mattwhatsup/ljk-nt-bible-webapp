import allBooksJSON from '@/components/BibleSelector/all-books.json'
import chapterVerseCountMappingJSON from '@/components/BibleSelector/all-chapter-verses-count.json'
import type { DataBook, ChapterVersesCount } from '../../app/data-types'
import escapeStringRegexp from 'escape-string-regexp'

const allBooks: DataBook[] = allBooksJSON as DataBook[]
const chapterVerseCountMapping: ChapterVersesCount[] =
  chapterVerseCountMappingJSON as ChapterVersesCount[]

export const parseSearch = (text: string) => {
  text = text.trim()
  const partialPattern = (text: string) => {
    const regex = /^(\d*)\s*[::\s.,]?\s*(\d*)$/i
    const match = text.match(regex)
    if (match) {
      return {
        bookFilter: '[current]',
        chapter: +match[1] || 0,
        verse: +match[2] || 0,
      }
    }
  }
  const fullPattern = (text: string) => {
    const regex = /([^\s]*)\s*(?:(\d*)\s*[::\s.,]?\s*(\d*))?/i
    const match = text.match(regex)
    if (match) {
      return {
        bookFilter: match[1],
        chapter: +match[2] || 0,
        verse: +match[3] || 0,
      }
    }
  }

  // const match = fullPattern(text)
  // if (match) return match
  return partialPattern(text) || fullPattern(text)
}

const matchName = (input: string, books: DataBook[]) => {
  type RetType = {
    book: DataBook
    weight: number // 权重
  }
  const nameTypes = [
    'name_en',
    'name_cn',
    'name_tr',
    'abbr_en',
    'abbr_cn',
    'abbr_tr',
    'pinyin_initial',
    'pinyin',
  ]
  const ret: RetType[] = []

  const insertIntoRet = (book: DataBook, weight: number) => {
    const find = ret.find(r => r.book.id === book.id)
    if (find) {
      find.weight = find.weight > weight ? find.weight : weight
    } else {
      ret.push({ book, weight })
    }
  }

  nameTypes.forEach(name => {
    books.forEach(book => {
      if (book[name] === input.toLowerCase()) {
        insertIntoRet(book, 3)
      } else if ((book[name] as string).startsWith(input.toLowerCase())) {
        insertIntoRet(book, 2)
      } else if ((book[name] as string).includes(input.toLowerCase())) {
        insertIntoRet(book, 1)
      }
    })
  })

  return [...ret].sort((a, b) => b.weight - a.weight).map(r => r.book)
}

const looseMatchName = (input: string, books: DataBook[]) => {
  const chars = input.split('').map(c => escapeStringRegexp(c))

  const newFilter = chars.join('.*')

  return books.filter(book => {
    const regex = new RegExp(newFilter, 'i')

    return (
      book.name_cn.match(regex) ||
      book.name_tr.match(regex) ||
      book.name_en.match(regex) ||
      book.pinyin.match(regex) ||
      book.pinyin_initial.match(regex)
    )
  })
}

const filterBooks = (input: string, books: DataBook[]) => {
  if (!input.trim()) return []

  const match1 = matchName(input, books)
  const match2 = looseMatchName(input, books)
  const ret = new Set([...match1, ...match2])

  return [...ret]
}

export const makePreciselySearchResults = (
  supposeBook: string,
  supposeChapter: number,
  supposeVerse: number,
) => {
  const filteredBooks = allBooks
    .filter(book => book.ot_or_nt === 'Nt')
    .filter(book => book.abbr_en === supposeBook)
    .map(book => ({
      id: book.id,
      name_en: book.name_en,
      name_tw: book.name_tr,
      name_cn: book.name_cn,
      abbr: book.abbr_en,
      chapter: supposeChapter || 1,
      verse: supposeVerse,
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

  return filteredBooks
}

export const makeAmbiguouslySearchResults = (
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
      verse: supposeVerse,
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

  return filteredBooks
}

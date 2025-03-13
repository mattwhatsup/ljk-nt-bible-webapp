import type { BibleItemNodeWithVerseList } from '@/scripts/includes/chapter-parser'
import axios from 'axios'
import allBooks from '@/components/BibleSelector/all-books.json'

const books = allBooks.filter(book => book.ot_or_nt === 'Nt')

export type BookName =
  | 'gen'
  | 'exo'
  | 'lev'
  | 'num'
  | 'deu'
  | 'jos'
  | 'jdg'
  | 'rut'
  | '1sa'
  | '2sa'
  | '1kg'
  | '2kg'
  | '1chr'
  | '2chr'
  | 'ezr'
  | 'neh'
  | 'est'
  | 'job'
  | 'psa'
  | 'prv'
  | 'eccl'
  | 'son'
  | 'isa'
  | 'jer'
  | 'lam'
  | 'eze'
  | 'dan'
  | 'hos'
  | 'joe'
  | 'amos'
  | 'obd'
  | 'jon'
  | 'mic'
  | 'nah'
  | 'hab'
  | 'zep'
  | 'hag'
  | 'zec'
  | 'mal'
  | 'mt'
  | 'mk'
  | 'lk'
  | 'joh'
  | 'act'
  | 'rom'
  | '1co'
  | '2co'
  | 'gal'
  | 'eph'
  | 'phi'
  | 'col'
  | '1th'
  | '2th'
  | '1ti'
  | '2ti'
  | 'tit'
  | 'phm'
  | 'heb'
  | 'jas'
  | '1pe'
  | '2pe'
  | '1jo'
  | '2jo'
  | '3jo'
  | 'jud'
  | 'rev'

export async function fetchBookChapters(lang: 'cn' | 'tw', bookName: BookName) {
  const chapters = await (
    await axios.get<BibleItemNodeWithVerseList[]>(
      `${process.env.NODE_ENV === 'gh' ? '/ljk-nt-bible-webapp/' : '/'}resources/${lang}-${bookName}.json`,
    )
  ).data
  return chapters
}

export function previous(bookName: BookName, chapterIndex: number) {
  const currentBookIndex = books.findIndex(book => book.abbr_en === bookName)

  if (chapterIndex > 1) {
    return {
      bookName,
      chapterIndex: chapterIndex - 1,
    }
  }

  if (currentBookIndex === 0) {
    return {
      bookName: books[books.length - 1].abbr_en,
      chapterIndex: books[books.length - 1].chapter_count,
    }
  } else {
    return {
      bookName: books[currentBookIndex - 1].abbr_en,
      chapterIndex: books[currentBookIndex - 1].chapter_count,
    }
  }
}

export function next(bookName: BookName, chapterIndex: number) {
  const currentBookIndex = books.findIndex(book => book.abbr_en === bookName)
  const currentBook = books[currentBookIndex]

  if (chapterIndex < currentBook.chapter_count) {
    return {
      bookName,
      chapterIndex: chapterIndex + 1,
    }
  }

  if (currentBookIndex === books.length - 1) {
    return {
      bookName: books[0].abbr_en,
      chapterIndex: 1,
    }
  } else {
    return {
      bookName: books[currentBookIndex + 1].abbr_en,
      chapterIndex: 1,
    }
  }
}

export function makeChapterRoutePath({
  bookName,
  chapterIndex,
}: {
  bookName: string
  chapterIndex: number
}) {
  return `/book/${bookName}/${chapterIndex}`
}

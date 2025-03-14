import type { BookName } from '@/features/book/bookApi'
import type {
  BibleItemNode,
  VerseNode,
} from '@/scripts/includes/chapter-parser'
import _allBooks from '@/components/BibleSelector/all-books.json'
import type { DataBook } from '@/app/data-types'

const allBooks = _allBooks as Array<DataBook>

export function copyToClipboard(text: string) {
  return navigator.clipboard.writeText(text)
}

export function getSelectedVersesText(
  language: 'cn' | 'tw',
  book: BookName,
  chapterIndex: number,
  selectedVerses: string[],
  items: BibleItemNode[],
  format: string = 'plain',
) {
  let ret: string[] = []
  const bookName = allBooks.find(item => item.abbr_en === book)![
    `abbr_${language === 'cn' ? 'cn' : 'tr'}`
  ] as string
  selectedVerses.forEach(verseIndex => {
    const item = items.find(item => {
      return item.type === 'verse' && item.verseIndex === verseIndex
    }) as VerseNode
    ret.push(verseNodeToText(bookName, chapterIndex, item, format))
  })
  return ret.join('\n')
}

export function verseNodeToText(
  bookName: string,
  chapterIndex: number,
  verseNode: VerseNode,
  format: string = 'plain',
) {
  return `${bookName} ${chapterIndex}:${verseNode.verseIndex} ${verseNode.contents
    .map(({ content }) => {
      return content.trim()
    })
    .join('')}`
}

import type { BookName } from '@/features/book/bookApi'
import type {
  BibleItemNode,
  VerseNode,
} from '@/scripts/includes/chapter-parser'

export function copyToClipboard(text: string) {
  navigator.clipboard.writeText(text).then(
    () => {
      console.log('Text copied to clipboard')
    },
    err => {
      console.error('Could not copy text: ', err)
    },
  )
}

export function getSelectedVersesText(
  bookName: BookName,
  chapterIndex: number,
  selectedVerses: string[],
  items: BibleItemNode[],
  format: string = 'plain',
) {
  let ret: string[] = []
  selectedVerses.forEach(verseIndex => {
    const item = items.find(item => {
      return item.type === 'verse' && item.verseIndex === verseIndex
    }) as VerseNode
    ret.push(verseNodeToText(bookName, chapterIndex, item, format))
  })
  return ret.join('\n')
}

export function verseNodeToText(
  bookName: BookName,
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

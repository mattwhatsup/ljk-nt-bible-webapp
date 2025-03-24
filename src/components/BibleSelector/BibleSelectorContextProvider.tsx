import type { FunctionComponent, ReactNode } from 'react'
import { createContext } from 'react'
import allBooks from './all-books.json'
import allChapterVersesCount from './all-chapter-verses-count.json'
import type { ChapterVersesCount, DataBook } from '../../app/data-types'

export const BibleSelectorContext = createContext<{
  books: Array<DataBook>
  chapterVersesCount: Array<ChapterVersesCount>
  isNTOnly: boolean
  showVerseSelector: boolean
} | null>(null)

interface BibleSelectorContextProviderProps {
  children: ReactNode
  isNTOnly: boolean
  showVerseSelector: boolean
}

const BibleSelectorContextProvider: FunctionComponent<
  BibleSelectorContextProviderProps
> = ({ children, isNTOnly, showVerseSelector }) => {
  return (
    <BibleSelectorContext.Provider
      value={{
        books: allBooks as Array<DataBook>,
        chapterVersesCount: allChapterVersesCount as Array<ChapterVersesCount>,
        isNTOnly,
        showVerseSelector,
      }}
    >
      {children}
    </BibleSelectorContext.Provider>
  )
}

export default BibleSelectorContextProvider

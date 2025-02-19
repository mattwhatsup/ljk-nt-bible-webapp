import type { FunctionComponent, ReactNode } from 'react'
import { createContext } from 'react'
import allBooks from './all-books.json'
import allChapterVersesCount from './all-chapter-verses-count.json'
import type { ChapterVersesCount, DataBook } from '../../app/api'

export const BibleSelectorContext = createContext<{
  books: Array<DataBook>
  chapterVersesCount: Array<ChapterVersesCount>
  isNTOnly: boolean
} | null>(null)

interface BibleSelectorContextProviderProps {
  children: ReactNode
  isNTOnly: boolean
}

const BibleSelectorContextProvider: FunctionComponent<
  BibleSelectorContextProviderProps
> = ({ children, isNTOnly }) => {
  return (
    <BibleSelectorContext.Provider
      value={{
        books: allBooks as Array<DataBook>,
        chapterVersesCount: allChapterVersesCount as Array<ChapterVersesCount>,
        isNTOnly,
      }}
    >
      {children}
    </BibleSelectorContext.Provider>
  )
}

export default BibleSelectorContextProvider

import type { FunctionComponent, ReactNode } from 'react'
import { createContext } from 'react'
import allBooks from './all-books.json'
import allChapterVersesCount from './all-chapter-verses-count.json'
import type { ChapterVersesCount, DataBook } from '../../app/api'

export const BibleSelectorContext = createContext<{
  books: Array<DataBook>
  chapterVersesCount: Array<ChapterVersesCount>
} | null>(null)

interface BibleSelectorContextProviderProps {
  children: ReactNode
}

const BibleSelectorContextProvider: FunctionComponent<
  BibleSelectorContextProviderProps
> = ({ children }) => {
  return (
    <BibleSelectorContext.Provider
      value={{
        books: allBooks as Array<DataBook>,
        chapterVersesCount: allChapterVersesCount as Array<ChapterVersesCount>,
      }}
    >
      {children}
    </BibleSelectorContext.Provider>
  )
}

export default BibleSelectorContextProvider

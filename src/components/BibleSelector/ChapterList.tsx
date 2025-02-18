import { FunctionComponent, HTMLAttributes, useContext } from 'react'
import { BibleSelectorContext } from './BibleSelectorContextProvider'
import { SelectedValueContext } from '.'
import BibleSelectorItem from './BibleSelectorItem'

interface ChapterListProps extends HTMLAttributes<HTMLDivElement> {}

const ChapterList: FunctionComponent<ChapterListProps> = ({ className }) => {
  const data = useContext(BibleSelectorContext)!
  const { selected, setSelected } = useContext(SelectedValueContext)!

  const capterCount = data.books.find(
    (book) => book.id === selected!.book,
  )!.chapter_count

  return (
    <div className={className}>
      <div className="flex items-center book-list-header leading-[31px]">
        <span className=" font-bold">章</span>
      </div>
      <div className="list-height overflow-y-auto list-content">
        <ul className="book-grid mt-2 ">
          {[...Array(capterCount)].map((_, index) => (
            <BibleSelectorItem
              active={selected?.chapter === index + 1}
              label={index + 1}
              key={index}
              onClick={() => {
                setSelected({ ...selected, chapter: index + 1 })
              }}
            />
          ))}
        </ul>
      </div>
    </div>
  )
}

export default ChapterList

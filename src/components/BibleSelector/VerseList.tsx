import type { FunctionComponent, HTMLAttributes } from 'react'
import { useContext } from 'react'
import { BibleSelectorContext } from './BibleSelectorContextProvider'
import { SelectedValueContext } from './BibleSelector'
import BibleSelectorItem from './BibleSelectorItem'
import { useT } from '@/features/settings/settingsSlice'

interface VerseListProps extends HTMLAttributes<HTMLDivElement> {
  closeHandler?: Function
}

const VerseList: FunctionComponent<VerseListProps> = ({
  className,
  closeHandler,
}) => {
  const data = useContext(BibleSelectorContext)!
  const { selected, setSelected } = useContext(SelectedValueContext)!

  const verseCount = data.chapterVersesCount.find(
    v =>
      v.book_sn.toLowerCase() === selected?.book &&
      v.chapter === selected?.chapter,
  )!.verses_count

  return (
    <div className={className}>
      <div className="flex items-center book-list-header leading-[31px]">
        <span className=" font-bold">{useT(['节', '節'])}</span>
      </div>
      <div className="list-height overflow-y-auto list-content">
        <ul className="book-grid mt-2">
          {[...Array(verseCount)].map((_, index) => (
            <BibleSelectorItem
              active={selected?.verse === index + 1}
              label={index + 1}
              key={index}
              onClick={() => {
                setSelected({ ...selected, verse: index + 1 })
                closeHandler?.()
              }}
            />
          ))}
        </ul>
      </div>
    </div>
  )
}

export default VerseList

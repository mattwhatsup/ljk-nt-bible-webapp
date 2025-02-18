import type { FunctionComponent, HTMLAttributes } from 'react'
import { Fragment, useContext, useEffect, useRef, useState } from 'react'
import { BibleSelectorContext } from './BibleSelectorContextProvider'
import { OtOrNt } from '../../app/api'
import { SelectedValueContext } from '.'
import { book_filter } from '../../utils/book-filter'
import BibleSelectorItem from './BibleSelectorItem'
import { Box, Icon } from '@chakra-ui/react'
import { FaTh } from 'react-icons/fa'
import { FaBars } from 'react-icons/fa6'

enum ListStyle {
  grid = 'grid',
  list = 'list',
}

interface BookListProps extends HTMLAttributes<HTMLDivElement> {}

function readListStyleFromLocalStorage() {
  const v = localStorage.getItem('BibleSelectorBookListStyle')
  if (!v || (v as ListStyle) === ListStyle.grid) {
    return ListStyle.grid
  } else {
    return ListStyle.list
  }
}

function writeListStyleToLocalStorage(v: string) {
  localStorage.setItem('BibleSelectorBookListStyle', v)
}

interface ListViewProps {
  style: ListStyle
  filterText?: string
}

const ListView: FunctionComponent<ListViewProps> = ({ style, filterText }) => {
  const context = useContext(SelectedValueContext)
  const selected = context?.selected
  const data = useContext(BibleSelectorContext)
  const groups = [
    { type: OtOrNt.ot, name: '旧约' },
    { type: OtOrNt.nt, name: '新约' },
  ]
  return (
    <div>
      {groups.map(group => (
        <Fragment key={group.type}>
          <>
            {(() => {
              if (!data) return null
              const books = data.books.filter(
                book =>
                  book.ot_or_nt === group.type &&
                  (filterText ? book_filter(book, filterText) : true),
              )
              return (
                books.length > 0 && (
                  <>
                    <div className=" text-lg mt-2 sticky top-0 bg-white">
                      {group.name}
                    </div>
                    <ul className={`book-${style} mt-2`}>
                      {books.map(book => (
                        <BibleSelectorItem
                          active={selected?.book === book.id}
                          key={book.id}
                          label={
                            style === ListStyle.grid
                              ? book.abbr_cn
                              : book.name_cn
                          }
                          onClick={() => {
                            if (context) {
                              context.setSelected({
                                ...selected,
                                book: book.id,
                              })
                            }
                          }}
                        />
                      ))}
                    </ul>
                  </>
                )
              )
            })()}
          </>
        </Fragment>
      ))}
    </div>
  )
}

const BookList: FunctionComponent<BookListProps> = ({ className }) => {
  const listDiv = useRef<HTMLDivElement>(null)
  const [listStyle, setListStyle] = useState(readListStyleFromLocalStorage())
  const [filterText, setFilterText] = useState('')

  useEffect(() => {
    // 重制滚动条
    if (listDiv.current) {
      const active = listDiv.current.querySelector('li.active')
      if (active) {
        active.scrollIntoView()
        listDiv.current.scrollTop -= 40
      } else {
        listDiv.current.scrollTop = 0
      }
    }
  }, [listStyle])

  return (
    <div className={className}>
      <Box display={'flex'} alignItems={'center'} className="book-list-header">
        <span className="font-bold">书</span>
        <div className=" flex-1 relative">
          <i className="fa fa-search absolute left-3 top-0 text-gray-400 text-sm"></i>
          <input
            type="text"
            className="form-control form-control-sm pl-8 rounded-2xl text-sm w-full"
            placeholder="过滤..."
            value={filterText}
            onChange={e => {
              setFilterText(e.target.value)
            }}
          />
        </div>

        <label className="swap swap-rotate" style={{ marginLeft: 8 }}>
          <input
            type="checkbox"
            onChange={({ target: { checked } }) => {
              const newValue = checked ? ListStyle.list : ListStyle.grid
              setListStyle(newValue)
              writeListStyleToLocalStorage(newValue)
            }}
            checked={listStyle === ListStyle.list}
          />
          <Icon className="swap-on" aria-hidden="true">
            <FaTh />
          </Icon>
          <Icon className="swap-off" aria-hidden="true">
            <FaBars />
          </Icon>
        </label>
      </Box>
      <div className="list-height overflow-y-auto list-content " ref={listDiv}>
        <ListView style={listStyle} filterText={filterText} />
      </div>
    </div>
  )
}

export default BookList

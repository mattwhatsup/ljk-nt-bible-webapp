import type { FunctionComponent, HTMLAttributes } from 'react'
import { Fragment, useContext, useEffect, useRef, useState } from 'react'
import { BibleSelectorContext } from './BibleSelectorContextProvider'
import { OtOrNt } from '../../app/data-types'
import { SelectedValueContext } from './BibleSelector'
import { book_filter } from '../../utils/book-filter'
import BibleSelectorItem from './BibleSelectorItem'
import { Box, HStack, Icon, Input, Text } from '@chakra-ui/react'
import { FaSearch, FaTh } from 'react-icons/fa'
import { FaBars } from 'react-icons/fa6'
import { InputGroup } from '../ui/input-group'
import {
  _T,
  getUiSizeClassName,
  useLanguage,
  useT,
  useUiSize,
} from '@/features/settings/settingsSlice'

enum ListStyle {
  grid = 'grid',
  list = 'list',
}

interface BookListProps extends HTMLAttributes<HTMLDivElement> {
  ignoreHeader?: boolean
}

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
  const language = useLanguage()
  const groups = data!.isNTOnly
    ? [{ type: OtOrNt.nt, name: _T(['新约', '新約'], language) }]
    : [
        { type: OtOrNt.ot, name: _T(['旧约', '舊約'], language) },
        { type: OtOrNt.nt, name: _T(['新约', '新約'], language) },
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
                    {groups.length > 1 ? (
                      <Box
                        fontSize={'lg'}
                        mt={2}
                        position={'sticky'}
                        top={0}
                        bg={'white'}
                      >
                        {group.name}
                      </Box>
                    ) : null}
                    <ul className={`book-${style} mt-2`}>
                      {books.map(book => (
                        <BibleSelectorItem
                          active={selected?.book === book.abbr_en.toLowerCase()}
                          key={book.id}
                          label={
                            style === ListStyle.grid
                              ? book[`abbr_${language === 'cn' ? 'cn' : 'tr'}`]
                              : book[`name_${language === 'cn' ? 'cn' : 'tr'}`]
                          }
                          onClick={() => {
                            if (context) {
                              context.setSelected({
                                ...selected,
                                book: book.abbr_en.toLowerCase(),
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

const BookList: FunctionComponent<BookListProps> = ({
  className,
  ignoreHeader,
}) => {
  const listDiv = useRef<HTMLDivElement>(null)
  const [listStyle, setListStyle] = useState(readListStyleFromLocalStorage())
  const [filterText, setFilterText] = useState('')
  const language = useLanguage()
  const uiSize = useUiSize()

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
    <Box
      className={className}
      display={'flex'}
      flexDirection={'column'}
      flex={1}
      minHeight={0}
    >
      <HStack
        display={'flex'}
        alignItems={'center'}
        className="book-list-header"
        gap={3}
      >
        {!ignoreHeader && (
          <Text
            className="font-bold"
            fontSize={getUiSizeClassName('md', uiSize, 'text')}
          >
            {_T(['书', '書'], language)}
          </Text>
        )}
        <InputGroup flex="1" startElement={<FaSearch />}>
          <Input
            rounded={'2em'}
            placeholder={useT(['搜索', '搜尋'])}
            fontSize={getUiSizeClassName('sm', uiSize, 'control')}
            // lineHeight={'1.25rem'}
            // height={'1.25rem'}
            padding={0}
            width={'full'}
            value={filterText}
            onChange={e => setFilterText(e.target.value)}
          />
        </InputGroup>

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
          <Icon
            className="swap-on"
            aria-hidden="true"
            // @ts-ignore
            size={getUiSizeClassName('sm', uiSize, 'button')}
          >
            <FaTh />
          </Icon>
          <Icon
            className="swap-off"
            aria-hidden="true"
            // @ts-ignore
            size={getUiSizeClassName('sm', uiSize, 'button')}
          >
            <FaBars />
          </Icon>
        </label>
      </HStack>

      <Box
        mt={2}
        className={`${ignoreHeader ? 'flex-1' : 'list-height'} overflow-y-auto list-content `}
        ref={listDiv}
        position={'relative'}
      >
        <Box
          position={'absolute'}
          top={0}
          left={0}
          right={0}
          bottom={0}
          zIndex={1}
          overflowY={'auto'}
        >
          <ListView style={listStyle} filterText={filterText} />
        </Box>
      </Box>
    </Box>
  )
}

export default BookList

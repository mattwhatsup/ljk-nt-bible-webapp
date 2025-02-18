import type { FunctionComponent } from 'react'
import { createContext } from 'react'
import BookDropDown from './BookDropDown'
import ChapterDropDown from './ChapterDropDown'
import VerseDropDown from './VerseDropDown'
import './BibleSelector.css'
import BibleSelectorContextProvider from './BibleSelectorContextProvider'
import type { SelectValue } from './BibleDropDown'
import { Box } from '@chakra-ui/react'

export const SelectedValueContext = createContext<
  | {
      selected?: SelectValue
      setSelected: (newSelected: SelectValue) => void
    }
  | undefined
>(undefined)
interface BibleSelectorProps {
  onChange?: (selected: SelectValue) => void
  selected?: SelectValue
}

const BibleSelector: FunctionComponent<BibleSelectorProps> = ({
  selected,
  onChange,
}) => {
  return (
    <SelectedValueContext.Provider
      value={{
        selected,
        setSelected: newSelected => {
          if (selected?.book !== newSelected.book) {
            newSelected.chapter = undefined
            newSelected.verse = undefined
          }
          if (selected?.chapter !== newSelected.chapter) {
            newSelected.verse = undefined
          }
          onChange?.(newSelected)
        },
      }}
    >
      <Box
        display={'flex'}
        alignItems={'center'}
        userSelect={'none'}
        cursor={'default'}
      >
        <BookDropDown />
        {selected?.book && (
          <>
            <i className=" text-gray-400 mx-1 fa-solid fa-chevron-right"></i>
            <ChapterDropDown />

            {selected.chapter && (
              <>
                <i className=" text-gray-400 mx-1 fa-solid fa-chevron-right"></i>
                <VerseDropDown />
              </>
            )}
          </>
        )}
      </Box>
    </SelectedValueContext.Provider>
  )
}

const Wrapper: FunctionComponent<BibleSelectorProps> = props => (
  <BibleSelectorContextProvider>
    <BibleSelector {...props} />
  </BibleSelectorContextProvider>
)

export default Wrapper

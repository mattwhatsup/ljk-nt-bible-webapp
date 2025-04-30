import type { FunctionComponent } from 'react'
import { createContext, useContext, useEffect, useState } from 'react'
import BookDropDown from './BookDropDown'
import ChapterDropDown from './ChapterDropDown'
import './BibleSelector.css'
import BibleSelectorContextProvider, {
  BibleSelectorContext,
} from './BibleSelectorContextProvider'
import type { SelectValue } from './BibleDropDown'
import { Box, Icon } from '@chakra-ui/react'
import { FaChevronRight } from 'react-icons/fa'
import { isSelectedValueComplete } from './utils'
import { useColorPalette } from '@/features/settings/settingsSlice'

export const SelectedValueContext = createContext<
  | {
      selected?: SelectValue
      setSelected: (newSelected: SelectValue) => void
    }
  | undefined
>(undefined)
interface BibleSelectorProps {
  onChange?: (selected: SelectValue) => void
  onClose?: Function
  selected?: SelectValue
}

const BibleSelector: FunctionComponent<BibleSelectorProps> = ({
  selected,
  onChange,
  onClose,
}) => {
  const [selectedState, setSelectedState] = useState<SelectValue>(selected!)
  const { showVerseSelector } = useContext(BibleSelectorContext)!

  useEffect(() => {
    if (selected) {
      setSelectedState(selected)
    }
  }, [selected])

  return (
    <SelectedValueContext.Provider
      value={{
        selected: selectedState,
        setSelected: newSelected => {
          if (selectedState?.book !== newSelected.book) {
            newSelected.chapter = undefined
            newSelected.verse = undefined
          }
          if (selectedState?.chapter !== newSelected.chapter) {
            newSelected.verse = undefined
          }

          if (isSelectedValueComplete(newSelected, showVerseSelector)) {
            onChange?.(newSelected)
          } else {
            setSelectedState(newSelected)
          }
        },
      }}
    >
      <style>{`
        .book-list > li.active {
          --tw-bg-opacity: 1;
          background-color: var(--chakra-colors-${useColorPalette()}-200);
          border-color: var(--chakra-colors-${useColorPalette()}-500);
        }
        .book-list > li{
          border-color: var(--chakra-colors-${useColorPalette()}-100);
        }
        .book-grid > li {
          --tw-bg-opacity: 1;
          border-color: var(--chakra-colors-${useColorPalette()}-100);
        }
        .book-grid > li.active {
          --tw-bg-opacity: 1;
          background-color: var(--chakra-colors-${useColorPalette()}-200);
          border-color: var(--chakra-colors-${useColorPalette()}-500);
        }
      `}</style>
      <Box
        display={'flex'}
        alignItems={'center'}
        userSelect={'none'}
        cursor={'default'}
      >
        <BookDropDown
          onClose={() => {
            if (!isSelectedValueComplete(selectedState, showVerseSelector)) {
              setSelectedState(selected!)
            }
            onClose?.()
          }}
        />
        {selected?.book && (
          <>
            <Icon color={'whiteAlpha.800'}>
              <FaChevronRight />
            </Icon>
            <ChapterDropDown
              onClose={() => {
                if (
                  !isSelectedValueComplete(selectedState, showVerseSelector)
                ) {
                  setSelectedState(selected!)
                }
                onClose?.()
              }}
            />
          </>
        )}
      </Box>
    </SelectedValueContext.Provider>
  )
}

const Wrapper: FunctionComponent<BibleSelectorProps> = props => (
  <BibleSelectorContextProvider isNTOnly={true} showVerseSelector={false}>
    <BibleSelector {...props} />
  </BibleSelectorContextProvider>
)

export default Wrapper

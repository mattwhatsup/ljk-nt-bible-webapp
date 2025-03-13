import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'
import type { RootState } from '@/app/store'

interface ChoosenState {
  selectedVerses: Record<string, string[]>
  lastSelectedVerse: Record<string, string>
}

const initialState: ChoosenState = {
  selectedVerses: {},
  lastSelectedVerse: {},
}

export const choosenSlice = createSlice({
  name: 'choosen',
  initialState,
  reducers: {
    selectVerse(
      state,
      action: PayloadAction<{
        book: string
        chapter: number
        verse: string
        shiftKey?: boolean
      }>,
    ) {
      const { book, chapter, verse, shiftKey } = action.payload
      const key = `${book}-${chapter}`
      if (!state.selectedVerses[key]) {
        state.selectedVerses[key] = []
      }
      const verses = new Set(state.selectedVerses[key])
      if (shiftKey && state.lastSelectedVerse[key]) {
        //
      } else {
        if (verses.has(verse)) {
          verses.delete(verse)
        } else {
          verses.add(verse)
        }
        state.selectedVerses[key] = Array.from(verses)
        state.lastSelectedVerse[key] = verse
      }
    },

    clearSelectedVerses(
      state,
      action: PayloadAction<{ book: string; chapter: number }>,
    ) {
      const { book, chapter } = action.payload
      const key = `${book}-${chapter}`
      delete state.selectedVerses[key]
      delete state.lastSelectedVerse[key]
    },
  },
})

export const { selectVerse, clearSelectedVerses } = choosenSlice.actions

// Selectors
export const selectSelectedVerses = (
  state: RootState,
  book: string,
  chapter: number,
) => state.choosen.selectedVerses[`${book}-${chapter}`] || []

export default choosenSlice.reducer

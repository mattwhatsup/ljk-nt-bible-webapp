import type { PayloadAction } from '@reduxjs/toolkit'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { RootState } from '@/app/store'
import type { BookName } from '../book/bookApi'

interface ChoosenState {
  selectedVerses: Record<string, string[]>
  lastSelectedVerse: Record<string, string>
}

const initialState: ChoosenState = {
  selectedVerses: {},
  lastSelectedVerse: {},
}

export const selectVerseThunkAction = createAsyncThunk(
  'choosen/fetchState',
  (
    _: {
      lang: 'cn' | 'tw'
      book: string
      chapter: number
      verse: string
      shiftKey?: boolean
    },
    { getState },
  ) => {
    const state = getState() as RootState
    return state
  },
)

export const choosenSlice = createSlice({
  name: 'choosen',
  initialState,
  reducers: {
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
  extraReducers: builder => {
    builder.addCase(selectVerseThunkAction.fulfilled, (state, action) => {
      const rootState = action.payload as RootState
      const { lang, book, chapter, verse, shiftKey } = action.meta.arg
      const verseList =
        rootState.books[lang]![book as BookName]!.chapters[chapter - 1]
          .verseList

      const key = `${book}-${chapter}`
      if (!state.selectedVerses[key]) {
        state.selectedVerses[key] = []
      }
      const verses = new Set(state.selectedVerses[key])
      if (shiftKey && state.lastSelectedVerse[key]) {
        // @todo
      } else {
        if (verses.has(verse)) {
          verses.delete(verse)
        } else {
          verses.add(verse)
        }
        state.selectedVerses[key] = Array.from(verses)
        state.lastSelectedVerse[key] = verse
      }
    })
  },
})

export const { clearSelectedVerses } = choosenSlice.actions

// Selectors
export const selectSelectedVerses = (
  state: RootState,
  book: string,
  chapter: number,
) => state.choosen.selectedVerses[`${book}-${chapter}`] || []

export default choosenSlice.reducer

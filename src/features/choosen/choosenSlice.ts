import type { PayloadAction } from '@reduxjs/toolkit'
import { createAsyncThunk, createSelector, createSlice } from '@reduxjs/toolkit'
import type { RootState } from '@/app/store'
import type { BookName } from '../book/bookApi'
import { selectLanguage } from '../settings/settingsSlice'

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

export const jumpToSelectVerseThunkAction = createAsyncThunk(
  'choosen/jumpToSelectVerse',
  async (
    {
      book,
      chapter,
      verse,
    }: {
      book: string
      chapter: number
      verse: string
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
    builder
      .addCase(selectVerseThunkAction.fulfilled, (state, action) => {
        const rootState = action.payload as RootState
        const lang = selectLanguage(rootState)
        const { book, chapter, verse, shiftKey } = action.meta.arg

        const verseList =
          rootState.books[lang]![book as BookName]!.chapters[chapter - 1]
            .verseList

        const key = `${book}-${chapter}`
        if (!state.selectedVerses[key]) {
          state.selectedVerses[key] = []
        }
        const verses = new Set(state.selectedVerses[key])
        if (shiftKey && state.lastSelectedVerse[key]) {
          let a = verseList.indexOf(state.lastSelectedVerse[key])
          let b = verseList.indexOf(verse)
          if (a > b) {
            ;[a, b] = [b, a]
          }
          verseList.slice(a, b + 1).forEach(v => {
            verses.add(v)
          })
          state.lastSelectedVerse[key] = verse
        } else {
          if (verses.has(verse)) {
            verses.delete(verse)
            delete state.lastSelectedVerse[key]
          } else {
            verses.add(verse)
            state.lastSelectedVerse[key] = verse
          }
        }
        // 排序
        state.selectedVerses[key] = verseList.filter(verseIndex =>
          verses.has(verseIndex),
        )
      })
      .addCase(jumpToSelectVerseThunkAction.fulfilled, (state, action) => {
        const rootState = action.payload as RootState
        const lang = selectLanguage(rootState)
        const { book, chapter, verse } = action.meta.arg

        const verseList =
          rootState.books[lang]![book as BookName]!.chapters[chapter - 1]
            .verseList

        const key = `${book}-${chapter}`
        if (!state.selectedVerses[key]) {
          state.selectedVerses[key] = []
        }
        const verses = new Set(state.selectedVerses[key])

        verses.add(verse)

        state.selectedVerses[key] = verseList.filter(verseIndex =>
          verses.has(verseIndex),
        )
      })
  },
})

export const { clearSelectedVerses } = choosenSlice.actions

// Selectors

export const selectSelectedVerses = (state: RootState) =>
  state.choosen.selectedVerses
export const makeChapterVersesSelector = (book: string, chapter: number) =>
  createSelector([selectSelectedVerses], selectedVerses => {
    const key = `${book}-${chapter}`
    return selectedVerses[key] || []
  })

export default choosenSlice.reducer

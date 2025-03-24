import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice, createAsyncThunk, createSelector } from '@reduxjs/toolkit'
import { fetchBookChapters, type BookName } from './bookApi'
import type { BibleItemNodeWithVerseList } from '@/scripts/includes/chapter-parser'
import type { RootState } from '@/app/store'
import { selectLanguage } from '../settings/settingsSlice'

export interface BookState {
  chapters: BibleItemNodeWithVerseList[]
  loading: boolean
  error: string | null
}

const initialState: Partial<
  Record<'cn' | 'tw', Partial<Record<BookName, BookState>>>
> = {}

// 异步 thunk 用于获取书籍数据
export const fetchChapters = createAsyncThunk(
  'books/fetchChapters',
  async ({ lang, bookName }: { lang: 'cn' | 'tw'; bookName: BookName }) => {
    return fetchBookChapters(lang, bookName)
  },
)

export const bookSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchChapters.pending, (state, action) => {
        if (!state[action.meta.arg.lang]) {
          state[action.meta.arg.lang] = {}
        }
        // @ts-ignore
        if (!state[action.meta.arg.lang][action.meta.arg.bookName]) {
          // @ts-ignore
          state[action.meta.arg.lang][action.meta.arg.bookName] = {
            loading: true,
            chapters: [],
          }
        }
        // @ts-ignore
        state[action.meta.arg.lang][action.meta.arg.bookName] = {
          // @ts-ignore
          ...state[action.meta.arg.lang][action.meta.arg.bookName],
          loading: true,
          error: null,
        }
      })
      .addCase(
        fetchChapters.fulfilled,
        (
          state,
          action: PayloadAction<
            BibleItemNodeWithVerseList[],
            string,
            {
              arg: {
                lang: 'cn' | 'tw'
                bookName: BookName
              }
            }
          >,
        ) => {
          // @ts-ignore
          state[action.meta.arg.lang][action.meta.arg.bookName] = {
            loading: false,
            error: null,
            chapters: action.payload,
          }
        },
      )
      .addCase(fetchChapters.rejected, (state, action) => {
        // @ts-ignore
        state[action.meta.arg.lang][action.meta.arg.bookName] = {
          loading: false,
          error: action.error.message || 'Failed to fetch books',
          chapters: [],
        }
      })
  },
})

export default bookSlice.reducer

const selectBooks = (state: RootState) => state.books

export const makeSelectChapter = (bookName: BookName, chapterIndex: number) =>
  createSelector([selectBooks, selectLanguage], (books, lang) => ({
    contents: books[lang]?.[bookName]?.chapters[chapterIndex - 1] || null,
    loading: books[lang]?.[bookName]?.loading || false,
    error: books[lang]?.[bookName]?.error || null,
  }))

// 查找某个verse的verseValue
export const makeSelectVerseLocationValue = (
  bookName: BookName,
  chapterIndex: number,
  verse: number,
) =>
  createSelector([selectBooks, selectLanguage], (books, lang) => {
    const data = books[lang]?.[bookName]?.chapters[chapterIndex - 1]
    if (data) {
      let { verseList } = data
      const verseVaule = verseList.find(v => {
        let [begin, end] = v.split('-')
        if (end === undefined) {
          end = begin
        }
        return verse >= parseInt(begin) && verse <= parseInt(end)
      })
      return verseVaule
    }
    return
  })

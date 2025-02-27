import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { fetchBookChapters, type BookName } from './bookApi'
import type { BibleItemNode } from '@/scripts/includes/chapter-parser'
import type { RootState } from '@/app/store'

export interface BookState {
  chapters: BibleItemNode[][]
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
            BibleItemNode[][],
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

export const selectChapter = (
  state: RootState,
  lang: 'cn' | 'tw',
  bookName: BookName,
  chapterIndex: number,
) => {
  return state.books[lang]?.[bookName]?.chapters[chapterIndex - 1] || null
}

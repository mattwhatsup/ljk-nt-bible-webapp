import type { RootState } from '@/app/store'
import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'

interface SettingsState {
  theme: 'light' | 'dark'
  language: 'cn' | 'tw'
  showComments: boolean
}

const loadState = (): SettingsState => {
  try {
    const serializedState = localStorage.getItem('settings')
    if (serializedState === null) {
      return {
        theme: 'light',
        language: 'cn',
        showComments: true,
      }
    }
    return JSON.parse(serializedState)
  } catch (err) {
    return {
      theme: 'light',
      language: 'cn',
      showComments: true,
    }
  }
}

const initialState: SettingsState = loadState()

export const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    setTheme(state, action: PayloadAction<'light' | 'dark'>) {
      state.theme = action.payload
    },
    setLanguage(state, action: PayloadAction<'cn' | 'tw'>) {
      state.language = action.payload
    },
    setShowComments(state, action: PayloadAction<boolean>) {
      state.showComments = action.payload
    },
  },
})

export const { setTheme, setLanguage, setShowComments } = settingsSlice.actions

export default settingsSlice.reducer

export const selectTheme = (state: RootState) => state.settings.theme
export const selectLanguage = (state: RootState) => state.settings.language
export const selectShowComments = (state: RootState) =>
  state.settings.showComments

import type { RootState } from '@/app/store'
import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'

interface SettingsState {
  theme: 'light' | 'dark'
  language: 'cn' | 'tw'
  showComments: boolean
  jumpToSelect: boolean
  afterNavigateKeepSelection: boolean
}

const defaultState: SettingsState = {
  theme: 'light',
  language: 'cn',
  showComments: true,
  jumpToSelect: false,
  afterNavigateKeepSelection: true,
}

const loadState = (): SettingsState => {
  try {
    const serializedState = localStorage.getItem('settings')
    if (serializedState === null) {
      return defaultState
    }
    // return { ...JSON.parse(serializedState), ...defaultState }
    return JSON.parse(serializedState)
  } catch (err) {
    return defaultState
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
    setJumpToSelect(state, action: PayloadAction<boolean>) {
      state.jumpToSelect = action.payload
    },
    setAfterNavigateKeepSelection(state, action: PayloadAction<boolean>) {
      state.afterNavigateKeepSelection = action.payload
    },
  },
})

export const {
  setTheme,
  setLanguage,
  setShowComments,
  setJumpToSelect,
  setAfterNavigateKeepSelection,
} = settingsSlice.actions

export default settingsSlice.reducer

export const selectTheme = (state: RootState) => state.settings.theme
export const selectLanguage = (state: RootState) => state.settings.language
export const selectShowComments = (state: RootState) =>
  state.settings.showComments
export const selectJumpToSelect = (state: RootState) =>
  state.settings.jumpToSelect
export const selectAfterNavigateKeepSelection = (state: RootState) =>
  state.settings.afterNavigateKeepSelection

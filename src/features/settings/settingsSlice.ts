import { useAppSelector } from '@/app/hooks'
import type { RootState } from '@/app/store'
import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'

interface SettingsState {
  theme: 'light' | 'dark' // 浅色 or 深色
  language: 'cn' | 'tw' // 简体中文 or 繁体中文
  showComments: boolean // 是否显示注释
  jumpToSelect: boolean // 是否跳转后选中
  afterNavigateKeepSelection: boolean // 是否在跳转后保留选择
  textSize: 10 | 12 | 14 | 16 | 18 | 20 | 22 | 24 | 26 | 28 | 30 // 字体大小
  uiSize: 'sm' | 'md' | 'lg' | 'xl'
}

const defaultState: SettingsState = {
  theme: 'light',
  language: 'cn',
  showComments: true,
  jumpToSelect: false,
  afterNavigateKeepSelection: true,
  textSize: 14,
  uiSize: 'md',
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

export const useShowComments = () => useAppSelector(selectShowComments)
export const selectJumpToSelect = (state: RootState) =>
  state.settings.jumpToSelect
export const selectAfterNavigateKeepSelection = (state: RootState) =>
  state.settings.afterNavigateKeepSelection

export const useLanguage = () => {
  const language = useAppSelector(selectLanguage)
  return language
}

export const _T = (texts: readonly [string, string], lang: 'cn' | 'tw') => {
  if (lang === 'cn') {
    return texts[0]
  }
  return texts[1]
}
// 双语
export const useT = (texts: readonly [string, string]) => {
  const lang = useLanguage()
  return _T(texts, lang)
}

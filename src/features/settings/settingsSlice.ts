import { useAppSelector } from '@/app/hooks'
import type { RootState } from '@/app/store'
import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'

const textSizes = [10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30] as const
export type TextSize = (typeof textSizes)[number]

const uiSizes = [0, 1, 2, 3] as const
export type UiSize = (typeof uiSizes)[number]

const colorPaletteTypes = [
  'gray',
  'red',
  'orange',
  'yellow',
  'green',
  'teal',
  'blue',
  'cyan',
  'purple',
  'pink',
] as const
export type ColorPaletteType = (typeof colorPaletteTypes)[number]
interface SettingsState {
  colorPalette: ColorPaletteType
  language: 'cn' | 'tw' // 简体中文 or 繁体中文
  showComments: boolean // 是否显示注释
  jumpToSelect: boolean // 是否跳转后选中
  afterNavigateKeepSelection: boolean // 是否在跳转后保留选择
  textSize: TextSize // 字体大小
  uiSize: UiSize
}

const defaultState: SettingsState = {
  colorPalette: 'gray',
  language: 'cn',
  showComments: true,
  jumpToSelect: false,
  afterNavigateKeepSelection: true,
  textSize: 14,
  uiSize: 0,
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
    setColorPalette(state, action: PayloadAction<ColorPaletteType>) {
      state.colorPalette = action.payload
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
    setTextSize(state, action: PayloadAction<TextSize>) {
      state.textSize = action.payload
    },
    setUiSize(state, action: PayloadAction<UiSize>) {
      state.uiSize = action.payload
    },
  },
})

export const {
  setColorPalette,
  setLanguage,
  setShowComments,
  setJumpToSelect,
  setAfterNavigateKeepSelection,
  setTextSize,
  setUiSize,
} = settingsSlice.actions

export default settingsSlice.reducer

export const selectColorPalette = (state: RootState) =>
  state.settings.colorPalette

export const useColorPalette = () => {
  const colorPalette = useAppSelector(selectColorPalette)
  return colorPalette || 'gray'
}
export const selectTextSize = (state: RootState) => state.settings.textSize

export const useTextSize = () => {
  const textSize = useAppSelector(selectTextSize)
  return textSize || 16
}

export const selectUiSize = (state: RootState) => state.settings.uiSize

export const useUiSize = () => {
  const uiSize = useAppSelector(selectUiSize)
  return uiSize
}
export const selectLanguage = (state: RootState) => state.settings.language
export const selectShowComments = (state: RootState) =>
  state.settings.showComments

export const useShowComments = () => useAppSelector(selectShowComments)
export const selectJumpToSelect = (state: RootState) =>
  state.settings.jumpToSelect

export const useJumpToSelect = () => useAppSelector(selectJumpToSelect)
export const selectAfterNavigateKeepSelection = (state: RootState) =>
  state.settings.afterNavigateKeepSelection

export const useAfterNavigateKeepSelection = () =>
  useAppSelector(selectAfterNavigateKeepSelection)
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
const sizes = [
  'xs',
  'sm',
  'md',
  'lg',
  'xl',
  '2xl',
  '3xl',
  '4xl',
  '5xl',
  '6xl',
  '7xl',
] as const
type SizeType = (typeof sizes)[number]

const uiTypes = ['button', 'text', 'control'] as const
type UiType = (typeof uiTypes)[number]
export const useUiSizeClassName = (base: SizeType, uiType: UiType) => {
  return getUiSizeClassName(base, useUiSize(), uiType)
}

export const getUiSizeClassName = (
  base: SizeType,
  enlarged: UiSize,
  uiType: UiType,
) => {
  const sizeIndex = sizes.indexOf(base)
  const enlargedIndex = sizeIndex + enlarged

  let maxIndex = sizes.length - 1
  switch (uiType) {
    case 'button':
      maxIndex = 4 // xl
      break
    case 'control':
      maxIndex = 3 // lg
      break
    case 'text':
      maxIndex = sizes.length - 1 // 7xl
      break
    default:
      break
  }

  return sizes[enlargedIndex > maxIndex ? maxIndex : enlargedIndex]
}

'use client'

import {
  ChakraProvider,
  createSystem,
  defineConfig,
  defaultConfig,
} from '@chakra-ui/react'
import { ColorModeProvider, type ColorModeProviderProps } from './color-mode'

const config = defineConfig({
  theme: {
    breakpoints: {
      tablet: '992px',
      desktop: '1200px',
      wide: '1400px',
      maxContent: '672px', // 2xl
    },
  },
})

const system = createSystem(defaultConfig, config)

export function Provider(props: ColorModeProviderProps) {
  return (
    <ChakraProvider value={system}>
      <ColorModeProvider {...props} />
    </ChakraProvider>
  )
}

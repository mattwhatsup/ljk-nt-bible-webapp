// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import React, { FC } from 'react'
import { transform } from '@babel/standalone'

type ParsedComponent = FC | null
export function parseJSX(jsxString: string): ParsedComponent {
  try {
    const transpiledCode = transform(jsxString, { presets: ['react'] }).code
    if (!transpiledCode) return null

    // 生成一个 React 组件
    // eslint-disable-next-line no-new-func
    return new Function('React', `return () => ${transpiledCode}`)(React)
  } catch (error) {
    console.error('JSX 解析错误:', error)
    return null
  }
}

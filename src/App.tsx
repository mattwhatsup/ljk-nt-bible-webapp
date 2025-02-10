import './App.css'
import { Counter } from './features/counter/Counter'
import { Quotes } from './features/quotes/Quotes'
import logo from './logo.svg'

import React, { FC } from 'react'
import { transform } from '@babel/standalone'

const jsxCode = `<button onClick={() => alert("Hello!")}>Click Me</button>`

type ParsedComponent = FC | null

function parseJSX(jsxString: string): ParsedComponent {
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
const App = () => {
  const Comp = parseJSX(jsxCode)
  return (
    <div className="App">
      <header className="App-header">
        {/*Comp && <Comp />*/}
        <Counter />
      </header>
    </div>
  )
}

export default App

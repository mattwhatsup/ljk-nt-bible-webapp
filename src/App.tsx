import './App.css'
import Demo from './Demo'
import { Counter } from './features/counter/Counter'
import { Quotes } from './features/quotes/Quotes'
import logo from './logo.svg'

const App = () => {
  return (
    <div className="App">
      <header className="App-header">
        <Demo />
      </header>
    </div>
  )
}

export default App

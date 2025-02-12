import BibleReader from './components/BibleReader'
import Layout from './components/Layout'
import Demo from './Demo'
import { Counter } from './features/counter/Counter'
import { Quotes } from './features/quotes/Quotes'
import logo from './logo.svg'

const App = () => {
  return (
    <div className="App">
      <Layout>
        <BibleReader />
      </Layout>
    </div>
  )
}

export default App

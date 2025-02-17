import Layout from './components/Layout'
import ResponsiveMenu from './components/ResponsiveMenu'
import { Routes, Route, Navigate } from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import Book from './pages/Book'
import Chapter from './pages/Chapter'

const App = () => {
  return (
    <div className="App">
      <ResponsiveMenu />
      <Layout>
        <Routes>
          <Route path="/" element={<Navigate to="/book/mt/1" />} />
          <Route path="/book/:book/:chapter?" element={<Book />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </Layout>
    </div>
  )
}

export default App

import Layout from './components/Layout'
import ResponsiveMenu from './components/ResponsiveMenu'
import { Routes, Route, Navigate, useParams, Outlet } from 'react-router-dom'
import About from './pages/About'
import Book from './pages/Book'

const App = () => {
  return (
    <div className="App">
      <ResponsiveMenu />
      <Routes>
        <Route path="/" element={<Navigate to="/book/mt/1" />} />

        <Route element={<OtherLayout />}>
          <Route path="/about" element={<About />} />
        </Route>
        <Route path="/book/:book/:chapter/:verse?" element={<BookLayout />}>
          <Route index element={<Book />} />
          {/* <Route path=":chapter" element={<Chapter />} /> */}
        </Route>
      </Routes>
    </div>
  )
}

const BookLayout = () => {
  const { book } = useParams<{ book: string }>()

  return (
    <Layout forBook>
      <Outlet />
    </Layout>
  )
}

const OtherLayout = () => {
  return (
    <Layout>
      <Outlet />
    </Layout>
  )
}

export default App

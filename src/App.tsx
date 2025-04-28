import Layout from './components/Layout'
import ResponsiveMenu from './components/ResponsiveMenu'
import {
  Routes,
  Route,
  Navigate,
  useParams,
  Outlet,
  useLocation,
} from 'react-router-dom'
import About from './pages/About'
import Book from './pages/Book'
import JumpToDialog from './components/JumpToDialog/JumpToDialog'
import Settings from './components/Settings'
import NoMatch from './NoMatch'

const App = () => {
  let location = useLocation()

  let state = location.state as { backgroundLocation?: Location }

  return (
    <div className="App">
      <ResponsiveMenu />
      <Routes location={state?.backgroundLocation || location}>
        <Route path="/" element={<Navigate to="/book/mt/1" />} />
        <Route path="/book/:book/:chapter/:verse?" element={<BookLayout />}>
          <Route index element={<Book />} />

          {/* <Route path=":chapter" element={<Chapter />} /> */}
        </Route>

        <Route element={<OtherLayout />}>
          <Route path="/about" element={<About />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="*" element={<NoMatch />} />
        </Route>
      </Routes>

      {state?.backgroundLocation && (
        <Routes>
          <Route path="/settings" element={<Settings />} />
        </Routes>
      )}
    </div>
  )
}
// modal example
// https://stackblitz.com/github/remix-run/react-router/tree/main/examples/modal?file=src%2FApp.tsx

const BookLayout = () => {
  const { book } = useParams<{ book: string }>()

  return (
    <Layout forBook>
      <Outlet />
      <JumpToDialog />
    </Layout>
  )
}

const OtherLayout = () => {
  return (
    <Layout>
      <Outlet />
      <JumpToDialog />
    </Layout>
  )
}

export default App

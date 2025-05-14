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
import Book from './pages/Book'
import JumpToDialog from './components/JumpToDialog/JumpToDialog'
import Settings from './components/Settings'
import NoMatch from './NoMatch'
import InfoLayout from './pages/InfoLayout'
import Preface from './pages/Preface'
import Bibliography from './pages/Bibliography'
import Logs from './pages/Logs'

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
          <Route path="/info" element={<InfoLayout />}>
            <Route index element={<Navigate to="preface" />} />
            <Route path="preface" element={<Preface />} />
            <Route path="bibliography" element={<Bibliography />} />
          </Route>
          <Route path="/logs" element={<Logs />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="*" element={<NoMatch />} />
        </Route>
      </Routes>

      {state?.backgroundLocation && (
        <Routes>
          <Route path="/settings" element={<Settings />} />
        </Routes>
      )}

      <Routes>
        <Route path="*" element={<AllLayout />} />
      </Routes>
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

const AllLayout = () => {
  return <></>
}

export default App

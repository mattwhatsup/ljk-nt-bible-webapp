import { useNavigate } from 'react-router-dom'

export function useNavigateBible() {
  const navigate = useNavigate()
  // const dispatch = useAppDispatch()

  return (book: string, chapter: number | string, verse?: number | string) => {
    const url = verse
      ? `/book/${book}/${chapter}/${verse}`
      : `/book/${book}/${chapter}`

    // dispatch(setLastNavigateBook(url))
    navigate(url)
  }
}

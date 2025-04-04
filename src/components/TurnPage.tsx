import type { BookName } from '@/features/book/bookApi'
import { makeChapterRoutePath, next, previous } from '@/features/book/bookApi'
import type { IconButtonProps } from '@chakra-ui/react'
import { IconButton } from '@chakra-ui/react'
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa'
import { useNavigate, useParams } from 'react-router-dom'

type Props = {}

export default function TurnPage({}: Props) {
  const { book, chapter } = useParams<{ book: string; chapter?: string }>()
  const nav = useNavigate()
  const iconPropsLeft = {
    rounded: 'full',
    variant: 'outline',
    position: 'fixed',
    md: {
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -0%) translateX(-22.5rem)',
    },
    mdDown: {
      top: '50%',
      left: '0',
    },
    size: { mdDown: 'xs', md: 'md' },
    bg: 'white',
    _hover: { bg: 'gray.100' },
  } as IconButtonProps

  const iconPropsRight = {
    ...iconPropsLeft,
    md: {
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -0%) translateX(22.55rem)',
    },
    mdDown: {
      top: '50%',
      right: '0',
    },
  } as IconButtonProps

  return (
    <>
      <IconButton
        {...iconPropsLeft}
        onClick={() =>
          nav(makeChapterRoutePath(previous(book as BookName, Number(chapter))))
        }
      >
        <FaAngleLeft />
      </IconButton>
      <IconButton
        {...iconPropsRight}
        onClick={() =>
          nav(makeChapterRoutePath(next(book as BookName, Number(chapter))))
        }
      >
        <FaAngleRight />
      </IconButton>
    </>
  )
}

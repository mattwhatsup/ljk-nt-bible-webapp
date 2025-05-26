import type {
  BibleItemNodeWithVerseList,
  VerseNode,
} from '@/scripts/includes/chapter-parser'
import { Box } from '@chakra-ui/react'
import Comment from './Comment'
import ChapterTitle from './ChapterTitle'
import Paragraph from './Paragraph'
import Reference from './Reference'
import Line from './Line'
import VerseNo from './VerseNo'
import { cloneElement } from 'react'
import CommentList from './CommonList'
import { useAppDispatch, useAppSelector } from '@/app/hooks'
import {
  makeChapterVersesSelector,
  selectVerseThunkAction,
} from '@/features/choosen/choosenSlice'
import { useParams } from 'react-router-dom'
import VerseActionBar from './VerseActionBar'
import { useTextSize } from '@/features/settings/settingsSlice'

type Props = {
  data: BibleItemNodeWithVerseList
}

function renderChapter(
  chapter: BibleItemNodeWithVerseList,
  selectedVerses: string[],
) {
  type _Node = {
    node: JSX.Element
    children?: JSX.Element[]
  }
  const nodes = [] as _Node[]

  let paragraphNode: JSX.Element | undefined = undefined
  let paragraphChildren = [] as JSX.Element[]

  chapter.nodeData.forEach((item, index) => {
    switch (true) {
      case item.type === 'chapter':
        nodes.push({ node: <ChapterTitle key={`c-${index}`} data={item} /> })
        break
      case item.type === 'comment':
        nodes.push({ node: <Comment key={index} data={item} /> })
        break
      case item.type === 'comment-list':
        nodes.push({ node: <CommentList key={index} data={item} /> })
        break
      case item.type === 'verse':
        {
          let _item = item as VerseNode
          const selected = selectedVerses.includes(_item.verseIndex)
          if (item.paragraph === 'paragraph') {
            paragraphNode = <Paragraph key={`p-${index}-${_item.verseIndex}`} />
            paragraphChildren = []
            nodes.push({ node: paragraphNode, children: paragraphChildren })
          } else if (item.paragraph === 'reference') {
            paragraphNode = <Reference key={`r-${index}`} />
            paragraphChildren = []
            nodes.push({ node: paragraphNode, children: paragraphChildren })
          }
          paragraphChildren.push(
            <VerseNo
              verseNo={item.verseIndex}
              key={`verse-no-${item.verseIndex}`}
              verse={item.verseIndex}
              selected={selected}
            />,
          )
          _item.contents.forEach((subItem, subIndex) => {
            switch (subItem.lineBreak) {
              case 'inline':
                paragraphChildren.push(
                  <Line
                    key={`l-${item.verseIndex}-${subIndex}`}
                    content={subItem.content}
                    verse={item.verseIndex}
                    selected={selected}
                  />,
                )
                break
              case 'line':
                paragraphChildren.push(<br key={`br-${index}-${subIndex}`} />)
                break
              case 'reference':
                paragraphNode = <Reference key={`${index}-${subIndex}`} />
                paragraphChildren = [
                  <Line
                    key={subIndex}
                    content={subItem.content}
                    verse={item.verseIndex}
                    selected={selected}
                  />,
                ]
                nodes.push({ node: paragraphNode, children: paragraphChildren })
                break
              case 'paragraph':
                paragraphNode = <Paragraph key={`${index}-${subIndex}`} />
                paragraphChildren = [
                  <Line
                    key={subIndex}
                    content={subItem.content}
                    verse={item.verseIndex}
                    selected={selected}
                  />,
                ]
                nodes.push({ node: paragraphNode, children: paragraphChildren })
                break
            }
          })
        }
        break

      default:
        break
    }
  })
  return (
    <>{nodes.map(({ node, children }) => cloneElement(node, {}, children))}</>
  )
}

function findMatchedParentNode(
  element: Element | null,
  matchFn: (element: Element) => boolean,
) {
  while (element && !matchFn(element)) {
    element = element.parentElement
  }
  return element
}

export default function BibleDisplay({ data }: Props) {
  const dispatch = useAppDispatch()
  const { book, chapter } = useParams<{ book: string; chapter?: string }>()
  const chapterVersesSelector = makeChapterVersesSelector(
    book!,
    parseInt(chapter || '1'),
  )
  const selectedVerses = useAppSelector(chapterVersesSelector)

  return (
    <Box
      userSelect={'none'}
      className="content-display"
      onClick={event => {
        let { target, shiftKey } = event
        if (target instanceof HTMLElement) {
          const el = findMatchedParentNode(target, el => {
            return (
              el.classList.contains('verse-no') ||
              el.classList.contains('verse-line')
            )
          })

          if (el) {
            // console.log({
            //   lang: language,
            //   book: book!,
            //   chapter: parseInt(chapter || '1'),
            //   verse: el.getAttribute('data-verse') || '1',
            //   shiftKey,
            // })
            dispatch(
              selectVerseThunkAction({
                book: book!,
                chapter: parseInt(chapter || '1'),
                verse: el.getAttribute('data-verse') || '1',
                shiftKey,
              }),
            )
          }
        }
      }}
    >
      <style>{`
        .content-display {font-size: ${useTextSize()}px;}
      `}</style>
      {renderChapter(data, selectedVerses)}
      {/* {selectedVerses.length > 0 && <VerseActionBar />} */}
      <VerseActionBar />
    </Box>
  )
}

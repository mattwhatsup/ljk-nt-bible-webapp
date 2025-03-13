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
import './BibleDisplay.css'
import CommentList from './CommonList'

type Props = {
  data: BibleItemNodeWithVerseList
}

function renderChapter(chapter: BibleItemNodeWithVerseList) {
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
            console.log(
              'Verse No.',
              el.getAttribute('data-verse'),
              'has been clicked',
              'and shiftKey=',
              shiftKey,
            )
          }
        }
      }}
    >
      {renderChapter(data)}
    </Box>
  )
}

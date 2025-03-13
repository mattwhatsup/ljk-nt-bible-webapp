import VerseList from '@/components/BibleSelector/VerseList'

export type BookChapterNode = {
  type: 'chapter'
  chapterIndex: string
}
export type VerseNode = {
  type: 'verse'
  paragraph: 'inline' | 'paragraph' | 'reference'
  verseIndex: string
  contents: VerseContentNode[]
}
export type VerseContentNode = {
  lineBreak: 'inline' | 'reference' | 'line'
  content: string
}
export type CommentNode = {
  type: 'comment'
  contents: string[]
}
export type CommentListNode = {
  type: 'comment-list'
  contents: string[]
}

export type BibleItemNode =
  | BookChapterNode
  | VerseNode
  | CommentNode
  | CommentListNode

export type BibleItemNodeWithVerseList = {
  verseList: string[]
  nodeData: BibleItemNode[]
}

export const chapterParser = (chapterSection: Element) => {
  // console.log(chapterSection.innerHTML, '****')
  const nodeData: BibleItemNode[] = []
  chapterSection.childNodes.forEach(node => {
    if (node.nodeType === 1) {
      const element = node as Element
      if (
        element.tagName.toUpperCase() === 'H4' &&
        element.className === 'chapter'
      ) {
        nodeData.push({
          type: 'chapter',
          chapterIndex: element.getAttribute('data-chapter')!,
        })
      } else if (
        element.tagName.toUpperCase() === 'P' &&
        element.className === 'comment'
      ) {
        nodeData.push({
          type: 'comment',
          contents: [element.innerHTML!],
        })
      } else if (
        element.tagName.toUpperCase() === 'OL' &&
        element.className === 'comment-list'
      ) {
        nodeData.push({
          type: 'comment-list',
          contents: [element.innerHTML!],
        })
      } else if (
        element.tagName.toUpperCase() === 'P' &&
        element.className === 'para'
      ) {
        iterateParagraph(element.firstChild!, nodeData)
      } else if (
        element.tagName.toUpperCase() === 'DIV' &&
        element.className === 'ot-refs'
      ) {
        iteratePsalmParagraph(element.firstChild!, nodeData)
      }
    }
  })

  return {
    verseList: [],
    nodeData,
  }
}

const getLastBookNode = (bookNodes: BibleItemNode[]) => {
  return bookNodes[bookNodes.length - 1]
}
const iterateParagraph = (node: Node, bookNodes: BibleItemNode[]) => {
  let firstTime = true
  while (node) {
    const lastBookNode = getLastBookNode(bookNodes)
    if (node.nodeType === 1) {
      const element = node as Element
      if (element.tagName.toUpperCase() === 'SUP') {
        const newNode: VerseNode = {
          type: 'verse',
          paragraph: firstTime ? 'paragraph' : 'inline',
          verseIndex: element.textContent!,
          contents: [],
        }
        bookNodes.push(newNode)
      } else {
        ;(lastBookNode as VerseNode).contents.push({
          lineBreak: 'inline',
          content: element.outerHTML!,
        })
      }
    } else if (node.nodeType === 3 && node.textContent!.trim() !== '') {
      // console.log(lastBookNode)
      ;(lastBookNode as VerseNode).contents.push({
        lineBreak: 'inline',
        content: node.textContent!,
      })
    }
    // console.log(firstTime && node.textContent!.trim() !== '', node.textContent)
    if (firstTime && node.textContent!.trim() !== '') {
      firstTime = false
    }
    node = node.nextSibling!
  }
}

const iteratePsalmParagraph = (node: Node, bookNodes: BibleItemNode[]) => {
  let firstTime = true

  while (node) {
    const lastBookNode = getLastBookNode(bookNodes)
    if (node.nodeType === 1) {
      const element = node as Element
      if (element.tagName.toUpperCase() === 'SUP') {
        const newNode: VerseNode = {
          type: 'verse',
          paragraph: firstTime ? 'reference' : 'inline',
          verseIndex: element.textContent!,
          contents: [],
        }
        bookNodes.push(newNode)
      } else if (element.tagName.toUpperCase() === 'BR') {
        ;(lastBookNode as VerseNode).contents.push({
          lineBreak: 'line',
          content: '',
        })
      } else {
        ;(lastBookNode as VerseNode).contents.push({
          lineBreak: 'inline',
          content: element.outerHTML!,
        })
      }
    } else if (node.nodeType === 3 && node.textContent!.trim() !== '') {
      ;(lastBookNode as VerseNode).contents.push({
        lineBreak: firstTime ? 'reference' : 'inline',
        content: node.textContent!,
      })
    }
    if (firstTime && node.textContent!.trim() !== '') {
      firstTime = false
    }
    node = node.nextSibling!
  }
}

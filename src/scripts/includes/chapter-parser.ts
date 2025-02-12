export type BookChapterNode = {
  type: 'chapter'
  chapterIndex: string
}
export type VerseNode = {
  type: 'verse'
  paragraph: 'inline' | 'paragraph' | 'psalm'
  verseIndex: string
  contents: VerseConentNode[]
}
export type VerseConentNode = {
  lineBreak: 'inline' | 'psalm' | 'line'
  content: string
}
export type CommentNode = {
  type: 'comment'
  contents: string[]
}

type BookNode = BookChapterNode | VerseNode | CommentNode

export const chapterParser = (chapterSection: Element) => {
  // console.log(chapterSection.innerHTML, '****')
  const ret: BookNode[] = []
  chapterSection.childNodes.forEach(node => {
    if (node.nodeType === 1) {
      const element = node as Element
      if (
        element.tagName.toUpperCase() === 'H4' &&
        element.className === 'chapter'
      ) {
        ret.push({
          type: 'chapter',
          chapterIndex: element.getAttribute('data-chapter')!,
        })
      } else if (
        element.tagName.toUpperCase() === 'P' &&
        element.className === 'comment'
      ) {
        ret.push({
          type: 'comment',
          contents: [element.textContent!],
        })
      } else if (
        element.tagName.toUpperCase() === 'P' &&
        element.className === 'para'
      ) {
        iterateParagraph(element.firstChild, ret)
      } else if (
        element.tagName.toUpperCase() === 'DIV' &&
        element.className === 'ot-refs'
      ) {
        iteratePsalmParagraph(element.firstChild, ret)
      }
    }
  })
  return ret
}

const getLastBookNode = (bookNodes: BookNode[]) => {
  return bookNodes[bookNodes.length - 1]
}
const iterateParagraph = (node: Node, bookNodes: BookNode[]) => {
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
      ;(lastBookNode as VerseNode).contents.push({
        lineBreak: 'inline',
        content: node.textContent!,
      })
    }
    // console.log(firstTime && node.textContent!.trim() !== '', node.textContent)
    if (firstTime && node.textContent!.trim() !== '') {
      firstTime = false
    }
    node = node.nextSibling
  }
}

const iteratePsalmParagraph = (node: Node, bookNodes: BookNode[]) => {
  let firstTime = true

  while (node) {
    const lastBookNode = getLastBookNode(bookNodes)
    if (node.nodeType === 1) {
      const element = node as Element
      if (element.tagName.toUpperCase() === 'SUP') {
        const newNode: VerseNode = {
          type: 'verse',
          paragraph: firstTime ? 'psalm' : 'inline',
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
        lineBreak: firstTime ? 'psalm' : 'inline',
        content: node.textContent!,
      })
    }
    if (firstTime && node.textContent!.trim() !== '') {
      firstTime = false
    }
    node = node.nextSibling
  }
}

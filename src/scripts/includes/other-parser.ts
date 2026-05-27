import { JSDOM } from 'jsdom'
import { load } from 'js-yaml'

function wrapLatinText(root: HTMLElement, dom: JSDOM): HTMLElement {
  const { Node, document } = dom.window
  function traverse(node: Node): void {
    // console.log(node.textContent)
    if (node.nodeType === Node.TEXT_NODE) {
      const text = node.nodeValue
      if (!text) return

      const regex = /([A-Za-z0-9!"#$%&'()*+,\-./:;<=>?@[\\\]^_`{|}~]+)/g
      if (regex.test(text)) {
        const frag = document.createDocumentFragment()
        let lastIndex = 0

        text.replace(regex, (match, _p1, offset) => {
          if (offset > lastIndex) {
            frag.appendChild(
              document.createTextNode(text.slice(lastIndex, offset)),
            )
          }

          const span = document.createElement('span')
          span.className = 'latin'
          span.textContent = match
          frag.appendChild(span)

          lastIndex = offset + match.length
          return match
        })

        if (lastIndex < text.length) {
          frag.appendChild(document.createTextNode(text.slice(lastIndex)))
        }

        if (node.parentNode) {
          node.parentNode.replaceChild(frag, node)
        }
      }
    } else if (node.nodeType === Node.ELEMENT_NODE) {
      const el = node as HTMLElement
      // 避免重复处理已经标记过的 .latin
      if (el.tagName === 'SPAN' && el.classList.contains('latin')) {
        return
      }
      Array.from(node.childNodes).forEach(traverse)
    }
  }

  Array.from(root.children).forEach(traverse)
  return root
}
export const convertArticle = (html: string) => {
  const dom = new JSDOM(html)
  // const children = [...dom.window.document.querySelector('body')!.children]
  //   // .slice(1)
  //   .map(node => {
  //     return wrapLatinText(node as HTMLElement, dom).outerHTML
  //     // return node.outerHTML
  //   })

  // return JSON.stringify({
  //   content: children.join(''),
  // })

  wrapLatinText(dom.window.document.querySelector('body')!, dom)
  return JSON.stringify({
    content: [...dom.window.document.querySelector('body')!.children]
      .map(n => n.outerHTML)
      .join(''),
  })
}

interface Version {
  version: string
  date: string
  description: string
  changes?: string[]
}

export interface HistoryData {
  Versions: Version[]
}

export const convertHistory = (yaml: string): string => {
  try {
    const data = load(yaml)
    return JSON.stringify({ content: data })
  } catch (e) {
    console.error('Error parsing YAML:', e)
    return JSON.stringify({ error: 'Failed to parse YAML' })
  }
}

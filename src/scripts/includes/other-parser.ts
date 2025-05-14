import { JSDOM } from 'jsdom'

export const convertPreface = (html: string) => {
  const dom = new JSDOM(html)
  const children = [...dom.window.document.querySelector('body')!.children]
    // .slice(1)
    .map(node => {
      return node.outerHTML
    })

  return JSON.stringify({
    content: children.join(''),
  })
}

export const convertBibliography = (html: string) => {
  const dom = new JSDOM(html)
  const children = [...dom.window.document.querySelector('body')!.children]
    // .slice(1)
    .map(node => {
      return node.outerHTML
    })

  return JSON.stringify({
    content: children.join(''),
  })
}

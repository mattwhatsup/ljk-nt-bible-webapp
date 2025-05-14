import { JSDOM } from 'jsdom'
import { load } from 'js-yaml'

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
    return JSON.stringify(data)
  } catch (e) {
    console.error('Error parsing YAML:', e)
    return JSON.stringify({ error: 'Failed to parse YAML' })
  }
}

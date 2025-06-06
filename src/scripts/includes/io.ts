import fs from 'fs'
import path from 'path'
import { JSDOM } from 'jsdom'
import { chapterParser } from './chapter-parser'

export function removeResources(dir: string) {
  if (fs.existsSync(dir)) {
    const files = fs.readdirSync(dir)
    files.forEach(file => {
      if (path.extname(file).toLowerCase() === '.json') {
        const filePath = path.join(dir, file)
        fs.unlinkSync(filePath)
        console.log(`已删除文件: ${filePath}`)
      }
    })
  }
}

export function outputBookResource(
  dir: string,
  bookName: string,
  prefix: string,
  content: string,
) {
  const filePath = path.join(dir, prefix + '-' + bookName + '.json')
  fs.writeFileSync(filePath, content)
}

export function replaceHTML(dom: JSDOM) {
  dom.window.document.querySelectorAll('div.line').forEach(a => {
    a.replaceWith(...a.childNodes, dom.window.document.createElement('br'))
  })
}

export function readBookResource(dir: string, bookName: string) {
  const filePath = path.join(dir, bookName + '.html')

  const html = fs.readFileSync(filePath, 'utf-8')
  const dom = new JSDOM(html)
  replaceHTML(dom)
  const chapters = [
    ...dom.window.document.querySelectorAll('section.chapter-section'),
  ]
  console.log(`读取文件: ${filePath}`, `共 ${chapters.length} 章`)
  return JSON.stringify(chapters.map(chapter => chapterParser(chapter)))
}

export function read(filePath: string) {
  const html = fs.readFileSync(filePath, 'utf-8')
  return html
}
export function write(filePath: string, content: string) {
  fs.writeFileSync(filePath, content)
}

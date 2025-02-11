import fs from 'fs'
import path from 'path'
import { JSDOM } from 'jsdom'
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

export function outputResource(
  dir: string,
  bookName: string,
  prefix: string,
  content: string,
) {
  const filePath = path.join(dir, prefix + '-' + bookName + '.json')
  fs.writeFileSync(filePath, content)
}

export function readResource(dir: string, bookName: string) {
  const filePath = path.join(dir, bookName + '.html')

  const html = fs.readFileSync(filePath, 'utf-8')
  const dom = new JSDOM(html)
  const chapters = [
    ...dom.window.document.querySelectorAll('section.chapter-section'),
  ]
  console.log(`读取文件: ${filePath}`, `共 ${chapters.length} 章`)
  return JSON.stringify(chapters.map(chapter => chapter.innerHTML))
}

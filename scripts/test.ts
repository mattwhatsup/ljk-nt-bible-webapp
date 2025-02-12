import path from 'path'
import { fileURLToPath } from 'url'
import {
  outputResource,
  readResource,
  removeResources,
  replaceHTML,
} from './includes/io'
import fs from 'fs'
import { JSDOM } from 'jsdom'
import { chapterParser } from './includes/chapter-parser'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const repoDir = path.join(__dirname, '../repo/ljk-nt-bible')
//

const filePath = path.join(repoDir, `zh-cn-c`, 'html', 'act.html')

const html = fs.readFileSync(filePath, 'utf-8')
const dom = new JSDOM(html)
replaceHTML(dom)
const ret = chapterParser(
  dom.window.document.querySelector(
    'section.chapter-section[data-chapter="4"]',
  ),
)

console.log(JSON.stringify(ret))

// console.log(
//   dom.window.document.querySelector('section.chapter-section[data-chapter="4"]')
//     .innerHTML,
// )

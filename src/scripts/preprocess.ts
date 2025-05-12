import path from 'path'
import { fileURLToPath } from 'url'
import {
  outputBookResource,
  read,
  readBookResource,
  removeResources,
  write,
} from './includes/io'
import { books, langs } from './includes/consts'
import { convertBibliography, convertPreface } from './includes/other-parser'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

console.log('进行预处理...')

const outputDir = path.join(__dirname, '../../public/resources')
const repoDir = path.join(__dirname, '../../repo/ljk-nt-bible')
console.log(`清空输出目录: ${outputDir}`)
removeResources(outputDir)
//

langs.forEach(lang => {
  const dir = path.join(repoDir, `zh-${lang}-c`, 'html')
  books.forEach(book => {
    outputBookResource(outputDir, book, lang, readBookResource(dir, book))
  })

  write(
    path.join(outputDir, `${lang}-preface.json`),
    convertPreface(read(path.join(dir, 'preface.html'))),
  )
  write(
    path.join(outputDir, `${lang}-bibliography.json`),
    convertBibliography(read(path.join(dir, 'bibliography.html'))),
  )
})

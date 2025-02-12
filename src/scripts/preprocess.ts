import path from 'path'
import { fileURLToPath } from 'url'
import { outputResource, readResource, removeResources } from './includes/io'
import { books, langs } from './includes/consts'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

console.log('进行预处理...')

const outputDir = path.join(__dirname, '../../public/resources')
const repoDir = path.join(__dirname, '../../repo/ljk-nt-bible')
console.log(`清空输出目录: ${outputDir}`)
removeResources(outputDir)
//

langs.forEach(lang => {
  books.forEach(book => {
    const dir = path.join(repoDir, `zh-${lang}-c`, 'html')
    outputResource(outputDir, book, lang, readResource(dir, book))
  })
})

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { JSDOM } from 'jsdom'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

console.log('进行预处理...')

// 例如：创建一个 `processed.txt` 作为示例
const outputDir = path.join(__dirname, '../public/resources', 'processed.txt')
const repoDir = path.join(__dirname, '../repo/ljk-nt-bible')

//

const html = fs.readFileSync(
  path.join(repoDir, 'zh-cn-c/html/1pe.html'),
  'utf-8',
)
const dom = new JSDOM(html)

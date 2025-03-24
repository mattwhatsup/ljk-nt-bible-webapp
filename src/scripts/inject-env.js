import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { dirname } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// 读取 404.html 文件
const filePath = path.join(__dirname, '../../dist/404.html')
let content = fs.readFileSync(filePath, 'utf-8')

// 注入环境变量
const basePath = process.env.NODE_ENV === 'gh' ? '/ljk-nt-bible-webapp' : ''
content = content.replace("var basePath = ''", `var basePath = '${basePath}'`)

// 写回 404.html 文件
fs.writeFileSync(filePath, content, 'utf-8')

console.log('Environment variables injected into 404.html')

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { dirname } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const indexPath = path.join(__dirname, '../../dist/index.html')
const notFoundPath = path.join(__dirname, '../../dist/404.html')
fs.copyFileSync(indexPath, notFoundPath)
console.log('Index.html copied to 404.html')

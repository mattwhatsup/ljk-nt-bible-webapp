import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

console.log('Running preprocess script...')

// 例如：创建一个 `processed.txt` 作为示例
const outputPath = path.join(__dirname, '../public/resources', 'processed.txt')
fs.writeFileSync(outputPath, 'This is a preprocessed file.', 'utf-8')

console.log('Preprocess script finished.', outputPath)

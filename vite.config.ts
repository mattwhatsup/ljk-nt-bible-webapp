import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'
import svgr from 'vite-plugin-svgr'
import { VitePWA } from 'vite-plugin-pwa'

import fs from 'fs'
import path from 'path'
import { version } from './package.json'

// 读取 public/resources 目录下的所有 JSON 文件
const resourcesDir = path.join(__dirname, 'public/resources')
const jsonFiles = fs
  .readdirSync(resourcesDir)
  .filter(file => file.endsWith('.json'))
  .map(file => ({
    url: `resources/${file}`,
    revision: version,
  }))
const base = process.env.NODE_ENV === 'gh' ? '/ljk-nt-bible-webapp/' : '/'

// console.log(process.env.NODE_ENV)

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tsconfigPaths(),
    svgr(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: [
        'favicon.ico',
        'apple-touch-icon.png',
        'masked-icon.svg',
        'web-app-manifest-192x192.png', // 更新这里
        'web-app-manifest-512x512.png', // 假设 512x512 的图标也使用相同的命名模式
      ],
      manifest: {
        name: '新约圣经梁家铿译本',
        short_name: '新约梁译本',
        description: '新约圣经梁家铿译本',
        theme_color: '#ffffff',
        background_color: '#ffffff',
        display: 'standalone',
        start_url: base,
        scope: base,
        icons: [
          {
            src: 'favicon.ico',
            sizes: '64x64 32x32 24x24 16x16',
            type: 'image/x-icon',
          },
          {
            src: 'web-app-manifest-192x192.png', // 更新这里
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: 'web-app-manifest-512x512.png', // 更新这里
            sizes: '512x512',
            type: 'image/png',
          },
        ],
      },
      workbox: {
        globPatterns: [
          '**/*.{js,css,html,ico,png,svg}',
          'resources/**/*.json', // 添加对 resources 目录下 json 文件的缓存
        ],
        runtimeCaching: [
          {
            urlPattern: ({ url }) => {
              const base =
                process.env.NODE_ENV === 'gh' ? '/ljk-nt-bible-webapp' : ''
              return url.pathname.startsWith(`${base}/resources/`)
            },
            handler: 'NetworkFirst', // 优先使用缓存
            options: {
              cacheName: 'static-resources',
              expiration: {
                maxEntries: 100, // 最多缓存100个文件
                maxAgeSeconds: 30 * 24 * 60 * 60, // 缓存30天
              },
            },
          },
        ],
        additionalManifestEntries: jsonFiles,
      },
    }),
  ],
  base,
  server: {
    open: true,
    port: 3000,
  },
  build: {
    sourcemap: true,
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: 'src/setupTests',
    mockReset: true,
  },
})

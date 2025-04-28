import { fileURLToPath } from 'url'
import { dirname, resolve } from 'path'
import fs from 'fs/promises'

const __dirname = dirname(fileURLToPath(import.meta.url))

async function generateStatic() {
  try {
    console.log('Starting static site generation...')

    const { render } = await import('../dist/server/entry-server.js')
    const template = await fs.readFile(resolve(__dirname, '../dist/client/index.html'), 'utf-8')

    const routes = ['/', '/product/mikrokamery', '/product/detektory']
    const basename = '/makieta-specteam'

    for (const route of routes) {
      const url = `${basename}${route}`.replace(/\/\/$/, '/')

      const { html: appHtml } = await render(url)
      const finalHtml = template.replace(
        /<div id="root"><\/div>/,
        `<div id="root">${appHtml}</div>`
      )

      const filePath = resolve(__dirname, `../dist/client${route === '/' ? '/index' : route}.html`)

      await fs.mkdir(dirname(filePath), { recursive: true })
      await fs.writeFile(filePath, finalHtml)
      console.log(`Generated: ${filePath}`)
    }

    console.log('Static site generation completed successfully!')
  } catch (error) {
    console.error('Error generating static files:', error)
    process.exit(1)
  }
}

generateStatic()

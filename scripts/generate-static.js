import { fileURLToPath } from 'url'
import { dirname, resolve } from 'path'
import fs from 'fs/promises'

// Usunięcie importu, który nie działał
// import { categories } from '../dist/server/data/categories.js'

const __dirname = dirname(fileURLToPath(import.meta.url))

// Funkcja pomocnicza do odczytu i przetworzenia pliku kategorii
async function getCategoriesFromSource() {
  const categoriesPath = resolve(__dirname, '../src/data/categories.ts')
  const fileContent = await fs.readFile(categoriesPath, 'utf-8')
  // Proste wyodrębnienie tablicy - zakładamy, że plik zaczyna się od 'export const categories = [' i kończy '];'
  const arrayString = fileContent.replace(/^export const categories = /, '').replace(/];\s*$/, ']')
  try {
    // Używamy eval w kontrolowany sposób, aby sparsować tablicę JS
    // Alternatywnie można by użyć bardziej zaawansowanego parsera

    return eval(`(${arrayString})`) // Owijamy w nawiasy, aby eval poprawnie sparsował literał obiektu/tablicy
  } catch (e) {
    console.error('Error parsing categories file content:', e)
    throw new Error('Could not parse categories from source file.')
  }
}

async function generateStatic() {
  try {
    console.log('Starting static site generation...')

    const { render } = await import('../dist/server/entry-server.js')
    const template = await fs.readFile(resolve(__dirname, '../dist/client/index.html'), 'utf-8')

    // Pobierz kategorie z pliku źródłowego
    const categories = await getCategoriesFromSource()

    // Generuj ścieżki dynamicznie
    const staticRoutes = ['/'] // Zawsze generuj stronę główną
    const productRoutes = categories.map(category => `/product/${category.title.toLowerCase()}`)
    const routes = [...staticRoutes, ...productRoutes]

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

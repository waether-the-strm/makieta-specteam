import React from 'react'
import { renderToPipeableStream } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom/server'
import { Writable } from 'stream'
import App from './App'
import './index.css'

export function render(url: string): Promise<{ html: string }> {
  return new Promise((resolve, reject) => {
    let html = ''
    const stream = renderToPipeableStream(
      <React.StrictMode>
        <StaticRouter location={url} basename={import.meta.env.BASE_URL || '/'}>
          <App />
        </StaticRouter>
      </React.StrictMode>,
      {
        onShellReady() {
          // This is called when the initial shell is ready, but we need the full content.
          // We'll pipe the stream to collect the data.
        },
        onAllReady() {
          // This is called when all content (including Suspense boundaries) is ready.
          // Now we can resolve the promise with the collected HTML.
          // Need to pipe the stream to capture the output.
          // For simplicity in this context, let's collect the stream data.
          // NOTE: In a real server, you'd pipe stream directly to the response (res).
          // Here we collect it into a string for static generation.

          // Create a simple Writable stream to collect the HTML
          const chunks: Buffer[] = []
          const writable = new Writable({
            write(chunk, _encoding, callback) {
              chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk))
              callback()
            },
            final() {
              html = Buffer.concat(chunks).toString('utf-8')
              resolve({ html })
            },
          })

          stream.pipe(writable)
        },
        onError(error) {
          console.error('SSR Error:', error)
          reject(error)
        },
      }
    )

    // If onShellReady is preferred (faster initial load but potentially incomplete for static gen):
    // stream.pipe(res); // In a real server scenario
    // To get the full HTML, we rely on onAllReady and collect the stream data there.
  })
}

import { fileURLToPath } from "url";
import { dirname, resolve } from "path";
import fs from "fs/promises";

const __dirname = dirname(fileURLToPath(import.meta.url));

async function generateStatic() {
  try {
    const { render } = await import("../dist/server/entry-server.js");
    const template = await fs.readFile(
      resolve(__dirname, "../dist/client/index.html"),
      "utf-8"
    );

    const routes = ["/"];

    for (const url of routes) {
      const { html: appHtml } = await render(url);

      const finalHtml = template.replace(
        '<div id="root"></div>',
        `<div id="root">${appHtml}</div>`
      );

      const filePath = resolve(
        __dirname,
        `../dist/client${url === "/" ? "/index" : url}.html`
      );

      await fs.mkdir(dirname(filePath), { recursive: true });
      await fs.writeFile(filePath, finalHtml);

      console.log(`Generated: ${filePath}`);
    }
  } catch (error) {
    console.error("Error generating static files:", error);
    process.exit(1);
  }
}

generateStatic();

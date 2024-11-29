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

      // Zachowaj wszystkie skrypty z oryginalnego template
      const scripts = template.match(/<script[^>]*>[^<]*<\/script>/g) || [];

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

      // Wydrukuj zawartość wygenerowanego pliku dla debugowania
      const generatedFile = await fs.readFile(filePath, "utf-8");
      console.log("Generated file contains scripts:", scripts.length);
      console.log(
        "Generated file contains root div:",
        generatedFile.includes('id="root"')
      );
    }
  } catch (error) {
    console.error("Error generating static files:", error);
    process.exit(1);
  }
}

generateStatic();

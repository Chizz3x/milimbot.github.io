import path from "path";
import fs from "fs";
import dotenv from "dotenv";
import { ROUTES } from "../routes";
import prettier from "prettier";

const env = dotenv.config({ path: path.resolve(".env") }).parsed || {};

const OUTPUT_FILE = path.resolve("public", "sitemap.xml");

(async () => {
  const prettierConfig = await prettier.resolveConfig(".prettierrc.json");

  const sitemap = await prettier.format(
    `
			<?xml version="1.0" encoding="UTF-8"?>
			<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
				${Object.values(ROUTES).map(route => `<url>
					<loc>${path.posix.join(env.PUBLIC_URL, "?", route)}</loc>
				</url>`).join("\n")}
			</urlset>
		`,
    {
      ...prettierConfig,
      parser: "html" 
    }
  );
	
  fs.writeFileSync(OUTPUT_FILE, sitemap);
	
  console.log(`Sitemap written at ${OUTPUT_FILE}`);
})();
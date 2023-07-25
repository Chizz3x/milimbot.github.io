import fs from "fs";
import PlatformPath from "path";

const toMove = [];

(async () => {
  for(const file of toMove) {
    const path = PlatformPath.resolve("src", file);
    const exists = fs.existsSync(path);
    if(exists) {
      fs.copyFileSync(path, PlatformPath.resolve("build", file));
      console.log(`copied ${file} to build`);
    }
  }
})();
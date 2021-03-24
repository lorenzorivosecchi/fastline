import fse from "fs-extra";
import path from "path";

export async function walkDir(dir: string) {
  const files = await fse.readdir(dir);
  // Filter out files that are not directories
  const directories = files.filter((file) => {
    const filePath = path.join(dir, file);
    const stats = fse.statSync(filePath);
    return stats.isDirectory();
  });

  return directories;
}

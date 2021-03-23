import path from "path";
import * as fs from "fs-extra";
import { emoji } from "node-emoji";
import { replaceInFile } from "replace-in-file";

interface IOptions {
  /** Path to the directory to copy from */
  srcDir: string;
  /** Path to the directory to copy into */
  outDir: string;
  /** A dictionary used to perform a find and replace on the source files */
  substitutions: Record<string, string>;
}

async function fastline(options: IOptions) {
  const { srcDir, outDir, substitutions } = options;

  // =====================
  //  Copy template files
  // =====================

  // Verify that template source directory exists.
  let sourceFiles;
  try {
    sourceFiles = await fs.readdir(srcDir);
  } catch (err) {
    throw new Error("template source directory doesn't exist.");
  }
  if (sourceFiles.length === 0) {
    throw new Error("template source directory doesn't have any files.");
  }

  // Create out directory if it doesn't exist
  await fs.mkdirp(outDir);

  // Verify that out directory is empty.
  const outFiles = await fs.readdir(outDir);
  if (outFiles.length > 0) {
    throw new Error("outDir must point to an empty directory");
  }

  console.log(
    `${emoji.gear} Copying template directory into ${path.resolve(outDir)}...`
  );

  // Copy template into the output directory.
  await fs.copy(srcDir, outDir);

  // =====================
  //  Apply Substitutions
  // =====================

  const subsKeys = Object.keys(substitutions);
  const subsKeysRegex = subsKeys.map((key) => new RegExp(key, "g"));
  const subsValues = subsKeys.map((key) => substitutions[key]);

  console.log(
    `${emoji.gear} Running a search and replace on ${sourceFiles.length} files...`
  );

  await replaceInFile({
    files: [`${outDir}/**/*`],
    from: subsKeysRegex,
    to: subsValues,
  });
}

export default fastline;

import path from "path";
import * as fs from "fs-extra";
import { emoji } from "node-emoji";
import { replaceInFile } from "replace-in-file";

export interface FastlineOptions {
  /** Path to the directory to copy from */
  srcDir: string;
  /** Path to the directory to copy into */
  outDir: string;
  /** A dictionary used to perform a find and replace on the source files */
  findAndReplace: Record<string, string>;
}

async function fastline(options: FastlineOptions) {
  const { srcDir, outDir, findAndReplace } = options;

  // =====================
  //  Copy template files
  // =====================

  // Verify that template source directory exists.
  let sourceFiles;
  try {
    sourceFiles = await fs.readdir(srcDir);
  } catch (err) {
    throw new Error("Source directory doesn't exist.");
  }
  if (sourceFiles.length === 0) {
    throw new Error("Source directory doesn't have any files.");
  }

  // Create out directory if it doesn't exist
  await fs.mkdirp(outDir);

  // Verify that out directory is empty.
  const outFiles = await fs.readdir(outDir);
  if (outFiles.length > 0) {
    throw new Error("Output directory is not empty");
  }

  console.log(
    `${emoji.gear}\tCopying source directory into ${path.resolve(outDir)}...`
  );

  // Copy template into the output directory.
  await fs.copy(srcDir, outDir);

  // =====================
  //  Apply Substitutions
  // =====================

  const subsKeys = Object.keys(findAndReplace);
  const subsKeysRegex = subsKeys.map((key) => new RegExp(key, "g"));
  const subsValues = subsKeys.map((key) => findAndReplace[key]);

  console.log(
    `${emoji.gear}\tPerforming a find and replace on ${sourceFiles.length} files...`
  );

  await replaceInFile({
    files: [`${outDir}/**/*`],
    from: subsKeysRegex,
    to: subsValues,
  });
}

export default fastline;

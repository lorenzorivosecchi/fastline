#!/usr/bin/env node

import fastline, { FastlineOptions } from "@fastline/core";
import { prompt } from "inquirer";
import path from "path";
import fs from "fs-extra";

type Answers = [
  {
    outDir: string;
    templatesRoot: string;
  },
  {
    srcDir: string;
  }
];

async function main() {
  console.log("Fastline CLI");
  const { outDir, templatesRoot } = await prompt<Answers[0]>([
    {
      type: "input",
      name: "outDir",
      message: "Enter the path to your directory",
      default: `${process.cwd()}/myapp`,
    },
    {
      type: "input",
      name: "templatesRoot",
      message:
        "Choose a template directory or use the default templates (hit ENTER to select default)",
      default: path.resolve(__dirname, "../templates"),
    },
  ]);

  const templateFiles = await fs.readdir(templatesRoot);

  const availableTemplates = templateFiles
    // Prepend absolute path to the filename
    .map((fileName) => path.join(templatesRoot, fileName))
    // Filter directories
    .filter((filePath) => fs.statSync(filePath).isDirectory());

  const { srcDir } = await prompt<Answers[1]>([
    {
      type: "list",
      name: "srcDir",
      choices: availableTemplates,
    },
  ]);

  await fastline({
    outDir: outDir,
    srcDir: srcDir,
    substitutions: {},
  });

  console.log("Done");
}

main();

/*
    {
      name: "srcDir",
      message: "Path to the source directory",
    },

*/

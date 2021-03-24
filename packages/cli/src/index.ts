#!/usr/bin/env node

import fastline from "@fastline/core";
import {
  getOutputDirectory,
  getSelectedTemplate,
  getTemplatesRoot,
} from "./prompts";
import { loadTemplateConfig } from "./config";

async function main() {
  console.log("Fastline CLI");

  const outDir = await getOutputDirectory();
  const templatesRoot = await getTemplatesRoot();
  const selectedTemplate = await getSelectedTemplate(templatesRoot);
  const templateConfig = await loadTemplateConfig(selectedTemplate);

  console.log(templateConfig);

  await fastline({
    outDir: outDir,
    srcDir: selectedTemplate,
    findAndReplace: {},
  });

  console.log("Done");
}

main();

// async function getSubstitutionPair() {

//   const answers = await prompt([
//     {
//       message: "Enter a regex string",
//       default: "/something/g",
//     },
//     {
//       type: "confirm",
//       name: "askAgain",
//       message: "Want to enter another substitution (just hit enter for YES)?",
//       default: true,
//     },
//   ]);

// }

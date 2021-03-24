#!/usr/bin/env node

import fastline from "@fastline/core";
import {
  getMatcherReplacement,
  getOutputDirectory,
  getSelectedTemplate,
  getTemplatesRoot,
} from "./prompts";
import { isTemplateConfig, loadTemplateConfig, TemplateConfig } from "./config";

async function main() {
  console.log("Fastline CLI");

  const outDir = await getOutputDirectory();
  const templatesRoot = await getTemplatesRoot();
  const selectedTemplate = await getSelectedTemplate(templatesRoot);

  const templateConfig = await loadTemplateConfig(selectedTemplate);

  let templateFAR: TemplateConfig["findAndReplace"] = {};
  let customizedFAR: typeof templateFAR = {};

  if (isTemplateConfig(templateConfig)) {
    templateFAR = templateConfig.findAndReplace;
  }

  await Promise.all(
    Object.keys(templateFAR).map(async (key) => {
      const matcher = key;
      const defaultReplace = templateFAR[key];
      const replace = await getMatcherReplacement(matcher, defaultReplace);
      customizedFAR[key] = replace;
    })
  );

  await fastline({
    outDir: outDir,
    srcDir: selectedTemplate,
    findAndReplace: customizedFAR,
  });

  console.log("Done");
}

main();

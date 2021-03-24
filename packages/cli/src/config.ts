import path from "path";
import fs from "fs-extra";
import { FastlineOptions } from "@fastline/core";

type TemplateConfig = Pick<FastlineOptions, "findAndReplace">;

const isTemplateConfig = (config: any): config is TemplateConfig => {
  return (
    typeof config === "object" && typeof config.findAndReplace === "object"
  );
};

export const loadTemplateConfig = async (dir: string): Promise<{} | void> => {
  const configPath = path.join(dir, "fastline.json");

  let config;

  try {
    config = await fs.readJSON(configPath);
  } catch (err) {
    if (err.code === "ENOENT") {
      console.warn("Template doesn't have a config file");
    }
  }

  if (isTemplateConfig(config)) {
    console.warn("Template config file is invalid");
  }

  return config;
};

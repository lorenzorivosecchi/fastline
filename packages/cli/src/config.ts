import path from "path";
import fs from "fs-extra";
import { FastlineOptions } from "@fastline/core";

export type TemplateConfig = Pick<FastlineOptions, "findAndReplace">;

export const isTemplateConfig = (config: any): config is TemplateConfig => {
  return (
    typeof config === "object" && typeof config.findAndReplace === "object"
  );
};

export const loadTemplateConfig = async (dir: string): Promise<{} | void> => {
  const configPath = path.join(dir, "fastline.json");

  try {
    return await fs.readJSON(configPath);
  } catch (err) {
    if (err.code === "ENOENT") {
      console.warn("Template doesn't have a config file");
    }
    console.trace(err.message);
  }
};

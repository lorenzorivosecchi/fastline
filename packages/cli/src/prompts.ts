import { prompt } from "inquirer";
import path from "path";
import fs from "fs-extra";

type SingleAnswer = {
  value: string;
};

export const getOutputDirectory = async (): Promise<string> => {
  const answer = await prompt<SingleAnswer>({
    type: "input",
    name: "value",
    message: "Enter the path to your directory",
    default: `${process.cwd()}/myapp`,
  });
  return answer.value;
};

export const getTemplatesRoot = async (): Promise<string> => {
  const answer = await prompt<SingleAnswer>({
    type: "input",
    name: "value",
    message:
      "Choose a template directory or use the default templates (hit ENTER to select default)",
    default: path.resolve(__dirname, "../templates"),
  });
  return answer.value;
};

export const getSelectedTemplate = async (rootDir: string): Promise<string> => {
  const templateFiles = await fs.readdir(rootDir);

  const availableTemplates = templateFiles
    // Prepend absolute path to the filename
    .map((fileName) => path.join(rootDir, fileName))
    // Filter directories
    .filter((filePath) => fs.statSync(filePath).isDirectory());

  const answer = await prompt<SingleAnswer>({
    type: "list",
    name: "value",
    message: "Choose a template",
    choices: availableTemplates,
  });
  return answer.value;
};

export const getMatcherReplacement = async (
  matcher: string,
  defaultReplace?: string
): Promise<string> => {
  const answer = await prompt<SingleAnswer>({
    name: "value",
    message: `Replace ${matcher} with ...`,
    default: defaultReplace,
  });
  return answer.value;
};

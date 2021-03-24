#!/usr/bin/env node

import fastline, { FastlineOptions } from "@fastline/core";
import inquirer from "inquirer";

type Answers = Pick<FastlineOptions, "srcDir" | "outDir">;

async function main() {
  const answers = await inquirer.prompt<Answers>(
    [
      {
        name: "outDir",
        message: "Path to the out directory",
        default: "./out",
        when: typeof process.argv[2] !== "string",
      },
      {
        name: "srcDir",
        message: "Path to the source directory",
      },
    ],
    {
      outDir: process.argv[2],
    }
  );
  console.log(answers);
}

main();

/*
    {
      name: "srcDir",
      message: "Path to the source directory",
    },

*/

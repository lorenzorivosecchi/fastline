#!/usr/bin/env node

import fastline from "@fastline/core";

fastline({
  outDir: process.argv[2] || "./out",
  srcDir: process.argv[3] || "./node_modules/@fastline/hello-world",
  substitutions: {
    [process.argv[4] || "name"]: process.argv[5] || "fastline",
  },
});

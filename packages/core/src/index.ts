interface IOptions {
  /** Path to the directory to copy from */
  srcDir: string;
  /** Path to the directory to copy into */
  outDir: string;
  /** A dictionary used to perform a find and replace on the source files */
  substitutions: Record<string, string>;
}

function fastline(options: IOptions) {
  console.log(options);
}

export default fastline;

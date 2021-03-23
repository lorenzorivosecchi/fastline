class Fastline {
  readonly outDir: FL.IConfig["outDir"];
  readonly template: FL.IConfig["template"];

  constructor(config: FL.IConfig) {
    this.outDir = config.outDir;
    this.template = config.template;
  }
}

export default Fastline;

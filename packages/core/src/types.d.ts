declare namespace FL {
  interface IConfig {
    /** Specifies where the template files should be copied to */
    outDir: string;
    /** Instructs Fastline how to find and modify the template */
    template: {
      /** Specifies the location of the template */
      path: string;
      /** Instructs Fastline which substitutions to perform on the template files */
      substitutions: Record<string, string>;
    };
  }
}

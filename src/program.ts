import {Constructor, Main, Macro} from './definitions';

export class Program {
  /** Main code. */
  readonly main: Macro;
  /** Constructor code. */
  readonly constr: Constructor | undefined;

  fields: {
    /** Author of this contract, usually "name <github-link>" */
    author?: string | string[];
    /** SPDX license of the contract. */
    license?: 'UNLICENSED' | 'MIT' | string;
    /** Title of the contract. */
    title?: string;
    /** A short description of the contract. */
    description?: string;
  } = {};

  // TODO: allow for macro exports, without needing main
  // such as https://github.com/huff-language/huffmate/blob/main/src/auth/NonPayable.huff
  constructor(main: Main, constructor?: Constructor) {
    this.main = main;
    this.constr = constructor;
  }

  /** Attach documentation to top of the file. */
  doc(fields: typeof this.fields) {
    this.fields = fields;
    return this;
  }

  // compiles the program
  compile(): string {
    return this.main.compile();
  }
}

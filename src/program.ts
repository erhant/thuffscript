import {Constructor, Main} from './definitions';

export class Program {
  /** Main code. */
  readonly main: Main;
  /** Constructor code. */
  readonly constr: Constructor | undefined;

  constructor(main: Main, constructor?: Constructor) {
    this.main = main;
    this.constr = constructor;
  }

  /** Attach comments to top of the file. */
  withComments(fields: {
    author?: string | string[];
    license?: 'UNLICENSED' | 'MIT' | string;
    title: string;
    description: string;
  }) {
    return this;
  }

  // compiles the program
  compile() {
    console.log('todo');
  }
}

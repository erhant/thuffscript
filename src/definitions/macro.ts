import {getDeclaration} from '.';
import {Op} from '../opcodes/types';

/**
 * A Huff macro
 */
export class Macro {
  /** Macro name. */
  readonly name: string;
  /** Arguments macro. */
  readonly args: string[];

  constructor(name: string, args: string[] = []) {
    this.name = name;
    this.args = args;
  }

  [getDeclaration](): string {
    return ''; // TODO
  }

  codesize(): string {
    return `__codesize(${this.name})`;
  }

  // TODO: handle empty arr
  code(...ops: (bigint | number | Op)[][]) {}
}

/**
 * A function (`fn`) definition.
 */
class Fn extends Macro {
  constructor() {
    super('MAIN');
  }
}

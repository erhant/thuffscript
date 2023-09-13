import {getDeclaration} from './symbols';
import type {Literal, Op} from '../types';
import {Constant} from './constant';
import {Event} from './event';
import {Function} from './function';
import {Label} from '.';

type Code<A extends string | never = string | never> =
  | `<${A}>`
  | Literal
  | Op
  | Constant
  | Function
  | Event
  | Macro
  | Label['src']
  | Label['dest'];
type Codes<A extends string | never = never> = (Code<A> | Code<A>[])[];

/**
 * A Huff macro.
 */
export class Macro<A extends string | never = string | never> {
  /** Macro name. */
  readonly name: string;
  /** Arguments macro. */
  readonly args: A[];
  /** Number of stack items popped. */
  readonly takes: number;
  /** Number of stack items pushed. */
  readonly returns: number;
  /** Is this a `macro` or a function `fn`? */
  readonly type: 'fn' | 'macro';

  constructor(name: string, params: {args?: A[]; takes?: number; returns?: number; fn?: true}, ...ops: Codes<A>) {
    this.name = name;
    this.args = params.args || [];
    this.takes = params.takes || 0;
    this.returns = params.returns || 0;
    this.type = params.fn ? 'fn' : 'macro';

    // assert takes and returns is integer
    if (!Number.isInteger(this.takes) || Number.isInteger(this.returns)) {
      throw new Error('Takes and returns must be integer.');
    }
  }

  [getDeclaration](): string {
    return `#define ${this.type}(${this.args.join(', ')})`; // TODO
  }

  get codesize(): string {
    return `__codesize(${this.name})`;
  }
}

// TODO: export Fn, Constructor, and Main macros
export class Main extends Macro {
  constructor(...ops: Codes) {
    super('MAIN', {}, ...ops);
  }
}

export class Constructor extends Macro {
  constructor(...ops: Codes) {
    super('CONSTRUCTOR', {}, ...ops);
  }
}

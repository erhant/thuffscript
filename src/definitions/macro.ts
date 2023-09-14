import {declare, parse} from './symbols';
import {Statement} from '../types/statement';
import {Literal} from '../types';

export class MacroCall<A extends string | never = string | never> {
  constructor(readonly args: {[arg in A]: Literal}, readonly macro: Macro<A>) {}
}

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

  constructor(name: string, params: {args?: A[]; takes?: number; returns?: number; fn?: true} = {}) {
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

  body(...ops: (Statement<A>[] | Statement<A>)[]) {
    return (args: {[arg in A]: Literal}) => new MacroCall(args, this);
  }

  [declare](): string {
    return `#define ${this.type}(${this.args.join(', ')})`; // TODO
  }

  [parse](args: Literal): string {
    // TODO
    return 'todo';
  }

  /** Calls `__codesize` for this macro. */
  get len(): string {
    return `__codesize(${this.name})`;
  }
}

export class Main extends Macro {
  constructor(...ops: (Statement[] | Statement)[]) {
    super('MAIN');
    this.body(...ops);
  }
}

export class Constructor extends Macro {
  constructor(...ops: (Statement[] | Statement)[]) {
    super('CONSTRUCTOR');
    this.body(...ops);
  }
}

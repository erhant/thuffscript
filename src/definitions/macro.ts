import {declare, define} from './symbols';
import {Statement} from '../types/statement';
import {Literal} from '../types';

export class MacroCall {
  constructor(readonly args: {[x: string]: Literal}, readonly macro: Macro) {}

  [declare]() {
    return this.macro[declare]();
  }

  [define]() {
    // sort keys, return corresponding values
    return `${this.macro.name}(${Object.keys(this.args)
      .sort()
      .map(k => this.args[k])
      .join(', ')})`;
  }
}

/**
 * A Huff macro.
 */
export class Macro<A extends string | never = string | never> {
  readonly name: string;
  readonly args: A[];
  readonly takes: number;
  readonly returns: number;
  readonly type: 'fn' | 'macro';
  isDeclared = false;

  constructor(name: string, params: {args?: A[]; takes?: number; returns?: number; fn?: true} = {}) {
    this.name = name;
    this.args = params.args || [];
    this.takes = params.takes || 0;
    this.returns = params.returns || 0;
    this.type = params.fn ? 'fn' : 'macro';

    // sort args to have a known order in declaration
    this.args = this.args.sort();

    // assert takes and returns is integer
    if (!Number.isInteger(this.takes) || !Number.isInteger(this.returns)) {
      throw new Error('Takes and returns must be integer.');
    }
  }

  body(...ops: (Statement<A>[] | Statement<A>)[]) {
    return (args: {[arg in A]: Literal}) => new MacroCall(args, this);
  }

  [declare](): string {
    this.isDeclared = true;
    return `#define ${this.type} ${this.name}(${this.args.join(', ')})`;
  }

  /** Calls `__codesize` for this macro. */
  get codesize() {
    return `__codesize(${this.name})`;
  }

  compile(): string {
    // TODO
    return '';
  }
}

export class Main extends Macro {
  constructor(...ops: (Statement<string>[] | Statement<string>)[]) {
    super('MAIN');
  }

  override body() {
    throw new Error('Cannot call body of main');
    return super.body();
  }
}

export class Constructor extends Macro {
  constructor(...ops: (Statement<string>[] | Statement<string>)[]) {
    super('CONSTRUCTOR');
  }

  override body() {
    throw new Error('Cannot call body of constructor');
    return super.body();
  }
}

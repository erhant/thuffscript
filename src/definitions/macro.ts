import {declare, define} from './symbols';
import type {Statement, Literal} from '../types';

/**
 * A call to a Huff macro with given arguments.
 *
 * This should never be called directly, but instead via the function
 * returned by `body` method of `Macro`.
 */
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
  ops: (Statement<A>[] | Statement<A>)[] = [];
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
    this.ops = ops;
    return this;
  }

  [declare](): string {
    this.isDeclared = true;
    return `#define ${this.type} ${this.name}(${this.args.join(', ')})`;
  }

  /** Calls `__codesize` for this macro. */
  get codesize() {
    return `__codesize(${this.name})`;
  }

  /** Returns a callable macro function with type-safe parameters. */
  get callable() {
    return (args: {[arg in A]: Literal}) => new MacroCall(args, this);
  }

  compile(): string[][] {
    if (this.ops.length === 0) {
      throw new Error('no op in macro: ' + this.name);
    }

    let compiledLines: string[][] = [];
    for (let line of this.ops) {
      // ensure line is an array
      if (!Array.isArray(line)) {
        line = [line];
      }

      let compiledLine: string[] = [];
      for (let op of line) {
        if (typeof op == 'bigint' || typeof op == 'number') {
          compiledLine.push('0x' + BigInt(op).toString(16));
        } else if (typeof op === 'string') {
          compiledLine.push(op);
        } else if (typeof op === 'function') {
          compiledLine.push(op());
        } else if (Object.hasOwn(op, define)) {
          compiledLine.push(op[define]());
        } else {
          // op satisfies never;
          console.log(op);
          console.log(typeof op);
          throw new Error('could not decide op');
        }
      }
      compiledLines.push(compiledLine);
    }

    // first levels are joined by newline
    // second levels are joined by space
    return compiledLines;
  }
}

export class Main extends Macro {
  constructor(...ops: (Statement<string>[] | Statement<string>)[]) {
    super('MAIN');
    super.ops = ops;
  }

  override body() {
    throw new Error('Cannot call body of main');
    return super.body();
  }
}

export class Constructor extends Macro {
  constructor(...ops: (Statement<string>[] | Statement<string>)[]) {
    super('CONSTRUCTOR');
    super.ops = ops;
  }

  override body() {
    throw new Error('Cannot call body of constructor');
    return super.body();
  }
}

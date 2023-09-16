import {Declarables} from '../common';
import {Body} from '../common/body';
import {Statement, Literal} from '../types';

/**
 * A Huff macro.
 */
export class Macro<A extends string | never = string | never> extends Body<A> {
  readonly args: A[];
  readonly takes: number;
  readonly returns: number;
  readonly type: 'fn' | 'macro';

  constructor(name: string, params: {args?: A[]; takes?: number; returns?: number; fn?: true} = {}) {
    super(name);
    this.args = params.args || [];
    this.takes = params.takes || 0;
    this.returns = params.returns || 0;
    this.type = params.fn ? 'fn' : 'macro';

    // sort args to have a known order in declaration
    this.args = this.args.sort();

    // assert takes and returns is integer
    if (!Number.isInteger(this.takes) || !Number.isInteger(this.returns)) {
      throw new Error('takes and returns must be integer.');
    }
  }

  body(...ops: (Statement<A>[] | Statement<A>)[]) {
    this.ops = ops;
    return this;
  }

  /** Returns a callable macro function with type-safe parameters. */
  get callable() {
    return (args: {[arg in A]: Literal}) => new MacroCall(this, args);
  }

  call(args: {[arg in A]: Literal}) {
    return new MacroCall(this, args);
  }

  /** Returns a statement that yields `codesize` of the macro. */
  get size() {
    return new MacroSize(this);
  }

  compile(): {
    body: string;
    declarables: Declarables[];
    macros: Macro[];
  } {
    const comp = super.compile();
    return {
      // prettier-ignore
      body: `#define ${this.type} ${this.name}(${this.args.join(', ')}) = takes(${this.takes}) returns(${this.returns}) {
    ${comp.body}
}`,
      declarables: comp.declarables,
      macros: comp.macros,
    };
  }
}

/**
 * A call to a Huff macro with given arguments.
 *
 * This should never be called directly, but instead via the function
 * returned by `body` method of `Macro`.
 */
export class MacroCall {
  readonly sortedKeys: string[];
  constructor(
    readonly macro: Macro,
    readonly args: {[x: string]: Literal}
  ) {
    // keys must be sorted to ensure the same order with values, regardless of object keys order
    this.sortedKeys = Object.keys(this.args).sort();
  }

  define() {
    return `${this.macro.name}(${this.sortedKeys.map(k => '0x' + this.args[k].toString(16)).join(', ')})`;
  }
}

export class MacroSize {
  constructor(readonly macro: Macro) {}

  define() {
    return `__codesize(${this.macro.name})`;
  }
}

export class Main extends Macro {
  constructor(...ops: (Statement<string>[] | Statement<string>)[]) {
    super('MAIN');
    super.ops = ops;
  }

  body() {
    return this;
  }
}

export class Constructor extends Macro {
  constructor(...ops: (Statement<string>[] | Statement<string>)[]) {
    super('CONSTRUCTOR');
    super.ops = ops;
  }

  body() {
    return this;
  }
}

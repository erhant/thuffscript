import {Body} from './body';
import {Literal} from '../types';

/** A `macro`. */
export class Macro<A extends string = string> extends Body<A> {
  readonly args: A[];
  readonly takes: number;
  readonly returns: number;
  protected type: 'fn' | 'macro';

  constructor(name: string, params: {args?: A[]; takes?: number; returns?: number} = {}) {
    super(name);
    this.type = 'macro';
    this.args = params.args || [];
    this.takes = params.takes || 0;
    this.returns = params.returns || 0;

    // sort args to have a known order in declaration
    this.args.sort();

    // assert takes and returns is integer
    if (!Number.isInteger(this.takes) || !Number.isInteger(this.returns)) {
      throw new Error('takes and returns must be integer.');
    }
  }

  call(args: {[arg in A]: Literal}): MacroCall {
    // is this a callable macro?
    if (this.name === 'MAIN' || this.name === 'CONSTRUCTOR') {
      throw new Error('cant call main or constructor');
    }

    // are all arguments given?
    const keys = Object.keys(args);
    if (keys.length !== this.args.length || !keys.every(arg => this.args.includes(arg as A))) {
      throw new Error('invalid call arguments');
    }

    return new MacroCall(this, args);
  }

  /** Returns a statement that yields `codesize` of the macro. */
  get size(): MacroSize {
    return new MacroSize(this);
  }

  compile() {
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
  constructor() {
    super('MAIN');
  }
}

export class Constructor extends Macro {
  constructor() {
    super('CONSTRUCTOR');
  }
}

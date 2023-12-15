import {Compilable} from './compilable';
import type {Literal} from '../types';

/** A [macro](https://docs.huff.sh/get-started/huff-by-example/#macros).
 *
 * - To get the macro size, use: `macro.size`
 * - To call a macro, use: `macro.call()`
 *
 * When you are defining a macro, use the following format:
 *
 * ```ts
 * const foo = new Macro('foo').body(
 *    // instructions
 * )
 * ```
 *
 * @param name name of the macro
 * @param args (optional) array of argument names; if provided, TypeScript will auto-complete
 * arguments as `<arg-name>` within the `body` function
 * @param takes (optional) number of stack items taken by this macro
 * @param returns (optional) number of stack items returned by this macro
 */
export class Macro<A extends string = string> extends Compilable<A> {
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

  /** Returns a macro/fn call (invocation) with given arguments.
   *
   * If there are no arguments, use as `call({})`. */
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

  /** Returns a statement that yields `codesize` of the macro/fn. */
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
 * A call to a macro with given arguments.
 *
 * This should never be called directly, but instead accessed via `Macro.call`.
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

/**
 * Get size of a macro.
 *
 * This should never be called directly, but instead accessed via `Macro.size`.
 */
export class MacroSize {
  constructor(readonly macro: Macro) {}

  define() {
    return `__codesize(${this.macro.name})`;
  }
}

/** Main entry to the program. */
export class Main extends Macro {
  constructor() {
    super('MAIN');
  }
}

/** A constructor that is called upon contract deployment. */
export class Constructor extends Macro {
  constructor() {
    super('CONSTRUCTOR');
  }
}

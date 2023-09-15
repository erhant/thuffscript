import {Constant, CustomError, Function, Event} from '../';
import {Statement, Literal, Declarable, Definable} from '../types';

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
  isCompiled = false;

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
      throw new Error('takes and returns must be integer.');
    }
  }

  body(...ops: (Statement<A>[] | Statement<A>)[]) {
    this.ops = ops;
    return this;
  }

  /** Returns a callable macro function with type-safe parameters. */
  get callable() {
    return (args: {[arg in A]: Literal}) => new MacroCall(args, this);
  }

  /** Returns a statement that yields codesize of the macro. */
  get codesize() {
    return new MacroSize(this);
  }

  compile(): {
    body: string;
    declarables: (Constant | Function | Event | CustomError)[];
    macros: Macro[];
  } {
    if (this.ops.length === 0) {
      throw new Error('empty macro body');
    }
    if (this.isCompiled) {
      throw new Error('already compiled');
    }

    this.isCompiled = true;

    let lines: string[][] = [];
    let declarables: (Constant | Function | Event | CustomError)[] = [];
    let macros: Macro[] = [];
    this.ops
      .map(line => (Array.isArray(line) ? line : [line]))
      .forEach(line => {
        let statements: string[] = [];

        line.forEach(op => {
          if (typeof op == 'bigint' || typeof op == 'number') {
            // a literal (bigint or number)
            let num = BigInt(op).toString(16);
            // make sure literal has even length
            if (num.length % 2 === 1) {
              num = '0' + num;
            }
            statements.push('0x' + num);
          } else if (typeof op === 'string') {
            // an opcode / argument
            statements.push(op);
          } else if (op instanceof Declarable) {
            // a declarable (and is also definable) (jump)
            statements.push(op.define());
            declarables.push(op);
          } else if (op instanceof Definable) {
            // a definable, without declaration (e.g. a label)
            statements.push(op.define());
          } else if (op instanceof MacroCall || op instanceof MacroSize) {
            // macro stuff
            statements.push(op.define());
            macros.push(op.macro);
          } else {
            // make sure no cases are left
            op satisfies never;
            throw new Error('could not parse op: ' + op);
          }
        });

        lines.push(statements);
      });

    return {
      // prettier-ignore
      body: `#define ${this.type} ${this.name}(${this.args.join(', ')}) = takes(${this.takes}) returns(${this.returns}) {
    ${lines.map(line => line.join(' ')).join('\n    ')}
}`,
      declarables,
      macros,
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
  constructor(readonly args: {[x: string]: Literal}, readonly macro: Macro) {
    // keys must be sorted to ensure the same order with values, regardless of object keys order
    this.sortedKeys = Object.keys(this.args).sort();
  }

  define() {
    return `${this.macro.name}(${this.sortedKeys.map(k => this.args[k]).join(', ')})`;
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

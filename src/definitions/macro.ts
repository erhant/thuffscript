import {Declarables} from '../common';
import {Body} from '../common/body';
import {ArgStatements, Literal, OpCode} from '../types';

/**
 * A Huff macro.
 */
export class Macro<Args extends string | never = string | never> extends Body {
  readonly args: Args[];
  // readonly arg: {[arg in A]: MacroArg};
  readonly takes: number;
  readonly returns: number;
  readonly type: 'fn' | 'macro';

  constructor(name: string, params: {args?: Args[]; takes?: number; returns?: number; fn?: true} = {}) {
    super(name);
    this.args = params.args || [];
    this.takes = params.takes || 0;
    this.returns = params.returns || 0;
    this.type = params.fn ? 'fn' : 'macro';

    // sort args to have a known order in declaration
    this.args.sort();

    // this.arg = Object.fromEntries(this.args.map(arg => [arg, new MacroArg(this, arg)])) as typeof this.arg;

    // assert takes and returns is integer
    if (!Number.isInteger(this.takes) || !Number.isInteger(this.returns)) {
      throw new Error('takes and returns must be integer.');
    }
  }

  call(args: {[arg in Args]: Literal}): MacroCall {
    return new MacroCall(this, args);
  }

  /** Returns a statement that yields `codesize` of the macro. */
  get size(): MacroSize {
    return new MacroSize(this);
  }

  body(...ops: ArgStatements<Args>[]) {
    const parsedOps: typeof this.ops = ops.map(op => {
      const curOp = Array.isArray(op) ? op : [op];
      return curOp.map(op =>
        typeof op === 'string' && op.startsWith('<') && op.endsWith('>') ? new MacroArg(this, op) : (op as OpCode)
      );
    });
    super.ops = parsedOps;
    return this;
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

export class MacroArg {
  constructor(
    readonly macro: Macro,
    readonly arg: string
  ) {}

  define() {
    return `<${this.arg}>`;
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

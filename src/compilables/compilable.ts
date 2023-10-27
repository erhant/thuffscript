import {TableSize, TableStart, Declarable, Declarables} from '../declarables';
import {JumpSource, JumpDest} from '../labels';
import {MacroCall, MacroSize, Macro} from '.';
import {Statements} from '../types';

/** A compilable Huff expression.
 *
 * Unlike the declarable onces, these expressions have instructions within their bodies, which may
 * refer to other compilables or declarables.
 *
 * In general form they look like this:
 *
 * ```c
 * #define FOO() = {
 *    // instructions
 * }
 * ```
 */
export abstract class Compilable<A extends string = string> {
  ops: Statements<A>[] = [];
  isCompiled = false;

  constructor(readonly name: string) {}

  // TODO: doc
  body(...ops: Statements<A>[]) {
    this.ops = ops;
    return this;
  }

  // TODO: doc
  compile(): {
    body: string;
    declarables: Declarables[];
    macros: Macro[];
  } {
    if (this.ops.length === 0) {
      throw new Error('empty body');
    }
    if (this.isCompiled) {
      throw new Error('already compiled');
    }
    this.isCompiled = true;

    const lines: string[][] = [];
    const declarables: Declarables[] = [];
    const macros: Macro[] = [];
    this.ops
      .map(line => (Array.isArray(line) ? line : [line]))
      .forEach(line => {
        const statements: string[] = [];

        line.forEach(op => {
          if (typeof op == 'bigint' || typeof op == 'number') {
            // a numeric literal, shall be represented as hexadecimal
            // e.g. literal
            statements.push('0x' + BigInt(op).toString(16));
          } else if (typeof op === 'string') {
            // a string literal
            // e.g. opcode, argument
            statements.push(op);
          } else if (op instanceof JumpSource || op instanceof JumpDest) {
            // an object with `define`, without declaration
            // e.g. a label and its destination
            statements.push(op.define());
          } else if (op instanceof Declarable) {
            // an object with `define` and `declare` where declaration is itself
            // e.g. constants, functions, errors, events
            statements.push(op.define());
            declarables.push(op);
          } else if (op instanceof TableSize || op instanceof TableStart) {
            // an object with `define` but declaration is from a common parent
            // e.g. a table with size and start
            statements.push(op.define());
            declarables.push(op.table);
          } else if (op instanceof MacroCall || op instanceof MacroSize) {
            // an object with `define` but without `declaration`, with `body`
            // e.g. a macro call or a macro codesize
            statements.push(op.define());
            macros.push(op.macro);
          } else {
            // confirm that there are no cases are left unhandled
            op satisfies never;
            throw new Error('could not parse op: ' + op);
          }
        });

        lines.push(statements);
      });

    // each statement in a line is joined by space,
    // and each line is joined by newline + 4 spaces
    const body = lines.map(line => line.join(' ')).join('\n    ');

    return {
      body,
      declarables,
      macros,
    };
  }
}

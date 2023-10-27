import type {OpCode} from '.';
import type {Constant, EventABI, FunctionABI, ErrorABI, Table, FreeStoragePointer} from '../declarables';
import type {Label} from '../labels';
import type {MacroCall, MacroSize} from '../compilables';

/** A literal, usually a hexadecimal. */
export type Literal = bigint | number;

/** A statement for Huff.
 *
 * @template `A`: type of arguments, used when a macro has arguments. If provides
 * auto-complete for `<arg>` strings. In most cases you can omit this parameter.
 */
export type Statement<A extends string = string> =
  // evm opcodes
  | OpCode
  // literals
  | Literal // numbers, hex literals
  | Constant // constant
  | FreeStoragePointer // storage slot
  // interfaces & abis
  | FunctionABI // function interface
  | EventABI // event interface
  | ErrorABI // a custom error
  // table
  | Table['size']
  | Table['start']
  // macros and fns
  | MacroCall // a macro call
  | MacroSize // macro codesize
  // macro arguments
  | `<${A}>`
  // jump source & destination
  | Label['src']
  | Label['dest'];

/**
 * An array of `Statement` types, or a single `Statement`.
 */
export type Statements<A extends string = string> = Statement<A>[] | Statement<A>;

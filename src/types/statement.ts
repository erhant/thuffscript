import type {OpCode} from '.';
import type {Constant, EventABI, FunctionABI, ErrorABI, Table, FreeStoragePointer} from '../declarables';
import type {Label} from '../definables';
import type {MacroCall, MacroSize} from '../bodies';

/** A literal, usually a hexadecimal. */
export type Literal = bigint | number;

/** A statement for Huff. */
export type Statement<A extends string = string> =
  // evm opcodes
  | OpCode
  // macro arguments
  | `<${A}>`
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
  // | MacroArg // a macro argument
  // jump source & destination
  | Label['src']
  | Label['dest'];

export type Statements<A extends string = string> = Statement<A>[] | Statement<A>;

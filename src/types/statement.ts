import type {OpCode} from '.';
import type {
  Constant,
  EventABI,
  FunctionABI,
  MacroCall,
  CustomError,
  MacroSize,
  Table,
  Label,
  FreeStoragePointer,
  MacroArg,
} from '../definitions';

/** A literal, usually a hexadecimal. */
export type Literal = bigint | number;

/** A statement for Huff. */
export type Statement =
  // evm opcodes
  | OpCode
  // literals
  | Literal // numbers, hex literals
  | Constant // constant
  | FreeStoragePointer // storage slot
  // interfaces & abis
  | FunctionABI // function interface
  | EventABI // event interface
  | CustomError // a custom error
  // table
  | Table['size']
  | Table['start']
  // macros and fns
  | MacroCall // a macro call
  | MacroSize // macro codesize
  | MacroArg // a macro argument
  // jump source & destination
  | Label['src']
  | Label['dest'];

export type Statements = Statement[] | Statement;

export type ArgStatement<A extends string | undefined> = A extends undefined ? Statement : Statement | `<${A}>`;

export type ArgStatements<A extends string | undefined> = ArgStatement<A>[] | ArgStatement<A>;

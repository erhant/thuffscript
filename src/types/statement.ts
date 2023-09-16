import type {Op} from '.';
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
} from '../definitions';

/** A literal, usually a hexadecimal. */
export type Literal = bigint | number;

/** A statement for Huff. */
export type Statement<Arg extends string | never> =
  // evm opcodes
  | Op
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
  | MacroCall // a macro / fn call
  | MacroSize // macro codesize
  | `<${Arg}>` // arguments to a macro/fn
  // jump source & destination
  | Label['src']
  | Label['dest'];

import type {Op} from '.';
import type {Constant, Event, Function, MacroCall, CustomError, Jump, MacroSize} from '../definitions';

/** A literal, usually a hexadecimal. */
export type Literal = bigint | number;

/** A statement for Huff. */
export type Statement<Arg extends string | never> =
  // evm opcodes
  | Op
  // literals
  | Literal // numbers, hex literals
  | Constant // constant
  // interfaces & abis
  | Function // function interface
  | Event // event interface
  | CustomError // a custom error
  // macro stuff
  | MacroCall // a macro / fn call
  | MacroSize // macro codesize
  | `<${Arg}>` // arguments to a macro/fn
  // jumps
  | Jump; // a Jump source & destination

import type {Op} from '.';
import type {Constant, Event, Function, Label, MacroCall, CustomError, Macro, Jump} from '../definitions';

/** A literal, usually a hexadecimal. */
export type Literal = bigint | number;

export type Statement<Arg extends string | never> =
  // evm opcodes
  | Uppercase<Op> // forced uppercase
  | Lowercase<Op> // forced lowercase
  // literals
  | Literal // numbers, hex literals
  | Constant // constant
  // interfaces & abis
  | Function // function interface
  | Event // event interface
  | CustomError // a custom error
  // macro stuff
  | MacroCall // a macro / fn call
  | Macro['codesize'] // macro codesize
  | `<${Arg}>` // arguments to a macro/fn
  // jumps
  | Jump; // a Jump source & destination

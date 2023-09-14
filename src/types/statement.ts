import {Literal, Op} from '.';
import {Constant, Event, Function, Label, MacroCall} from '../definitions';

export type Statement<A extends string | never = string | never> =
  | `<${A}>`
  | Literal // number, triggers PUSH
  | Op // evm opcode
  | Constant // constant
  | Function // function interface
  | Event // event interface
  | MacroCall // a macro / fn call
  | Label['src'] // a Jump source
  | Label['dest']; // a Jump destination

//   type Codes<A extends string | never = never> = (Code<A> | Code<A>[])[];

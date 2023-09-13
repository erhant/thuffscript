import {_8_256, u5} from './util';

/** Primitive data types. */
type SinglePrimitive =
  // bool
  | 'bool'
  // int & uint
  | `${'' | 'u'}int${'' | _8_256}`
  // address
  | 'address'
  | 'address payable' // TODO: is it ok to do payable like this?
  // bytes
  | `bytes${u5 | ''}`;

export type Primitive = SinglePrimitive | `${SinglePrimitive}[${bigint | ''}]`;

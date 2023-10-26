import type {_1_32, _8_256} from './range';

// also relevant: https://github.com/huff-language/huff-rs/blob/main/huff_utils/src/types.rs#L9

/** Primitive data types. */
type SinglePrimitive =
  // bool
  | 'bool'
  // int & uint
  | `${'' | 'u'}int${'' | _8_256}`
  // address
  | 'address'
  // bytes
  | `bytes${_1_32 | ''}`;

/** An array primitive type. */
type ArrayPrimitive = `${SinglePrimitive}[${bigint | ''}]`;

export type Primitive = SinglePrimitive | ArrayPrimitive | 'address payable'; // TODO: is it ok to do payable like this?;

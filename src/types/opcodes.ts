import type {_1_16, _1_32, _1_4} from './util';

/** All EVM [opcodes](https://www.evm.codes/), Shanghai version. */
// prettier-ignore
export type Op = 
// Stop
'stop' |
// Arithmetic
'add' | 'mul' | 'sub' | 'div' | 'sdiv' | 'mod' | 'smod' | 'addmod' | 'mulmod' | 'exp' | 'signextend' |
// Comparators & Logic
'lt' | 'gt' | 'slt' | 'sgt' | 'eq' | 'iszero' | 'and' | 'or' | 'xor' | 'not' |
// Bytes & Shifting
'byte' | 'shl' | 'shr' | 'sar' |
// SHA3
'sha3' |
// Address & balance
'address' | 'balance' | 'origin' | 'caller' |
// Call
`call${'value' | 'dataload' | 'datacopy'}` |
// Gasprice
'gasprice' |
// Code, Extcode and Returndata
`${'code' | 'extcode' | 'returndata'}${'size' | 'copy'}` |
// Hash
'extcodehash' | 'blockhash' |
// Block stuff
'coinbase' | 'timestamp' | 'number' | 'prevrandao' | 'gaslimit' | 'chainid' |
// Self balance
'selfbalance' |
// Base fee
'basefee' |
// Pop
'pop' |
// Load and store
`${'s'|'m'}${'load' | 'store'}` | `mstore8` |
// Jumps, PC, MSIZE and GAS
`jump${''|'i'|'dest'}` | 'pc' | 'msize' | 'gas' |
// Push, Dup and Swap
// TODO: do not use
`push${_1_32 | 0}` | `dup${_1_16}` | `swap${_1_16}` |
// Log
`log${_1_4 | 0}` |
// Creates and calls
`create${'' | '2'}` | `${'' | 'delegate' | 'static'}call` | 'callcode' | 
// Terminations
'return' | 'revert' | 'invalid' | 'selfdestruct';

// Challenge: shortest way to represent the opcodes in type system?

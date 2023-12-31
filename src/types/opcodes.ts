/** All EVM [opcodes](https://www.evm.codes/), Shanghai version. */
// prettier-ignore
export type OpCode = 
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
// we do not use PUSH instructions for Huff
`${"dup" | "swap"}${1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16}` |
// Log
`log${0 | 1 | 2 | 3 | 4}` |
// Creates and calls
`create${'' | '2'}` | `${'' | 'delegate' | 'static'}call` | 'callcode' | 
// Terminations
'return' | 'revert' | 'invalid' | 'selfdestruct';

// Type-Golfing Challenge: shortest way to represent the opcodes in type system?

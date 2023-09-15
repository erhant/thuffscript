import type {_1_16, _1_32, _1_4} from './util';

/** All EVM [opcodes](https://www.evm.codes/), Shanghai version. */
export type Op =
  | Uppercase<EvmOps> // forced uppercase
  | Lowercase<EvmOps>; // forced lowercase

// prettier-ignore
type EvmOps = 
// Stop
'STOP' |
// Arithmetic
'ADD' | 'MUL' | 'SUB' | 'DIV' | 'SDIV' | 'MOD' | 'SMOD' | 'ADDMOD' | 'MULMOD' | 'EXP' | 'SIGNEXTEND' |
// Comparators & Logic
'LT' | 'GT' | 'SLT' | 'SGT' | 'EQ' | 'ISZERO' | 'AND' | 'OR' | 'XOR' | 'NOT' |
// Bytes & Shifting
'BYTE' | 'SHL' | 'SHR' | 'SAR' |
// SHA3
'SHA3' |
// Address & balance
'ADDRESS' | 'BALANCE' | 'ORIGIN' | 'CALLER' |
// Call
`CALL${'VALUE' | 'DATALOAD' | 'DATACOPY'}` |
// Gasprice
'GASPRICE' |
// Code, Extcode and Returndata
`${'CODE' | 'EXTCODE' | 'RETURNDATA'}${'SIZE' | 'COPY'}` |
// Hash
'EXTCODEHASH' | 'BLOCKHASH' |
// Block stuff
'COINBASE' | 'TIMESTAMP' | 'NUMBER' | 'PREVRANDAO' | 'GASLIMIT' | 'CHAINID' |
// Self balance
'SELFBALANCE' |
// Base fee
'BASEFEE' |
// Pop
'POP' |
// Load and store
`${'S'|'M'}${'LOAD' | 'STORE'}` | `MSTORE8` |
// Jumps, PC, MSIZE and GAS
`JUMP${''|'I'|'DEST'}` | 'PC' | 'MSIZE' | 'GAS' |
// Push, Dup and Swap
`PUSH${_1_32 | 0}` | `DUP${_1_16}` | `SWAP${_1_16}` |
// Log
`LOG${_1_4 | 0}` |
// Creates and calls
`CREATE${'' | '2'}` | `${'' | 'DELEGATE' | 'STATIC'}CALL` | 'CALLCODE' | 
// Terminations
'RETURN' | 'REVERT' | 'INVALID' | 'SELFDESTRUCT';

// Challenge: shortest way to represent the opcodes in type system?

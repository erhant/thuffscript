// number shorthands
type u2 = 1 | 2 | 3 | 4;
type u4 = u2 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16;
type u5 = u4 | 17 | 18 | 19 | 20 | 21 | 22 | 23 | 24 | 25 | 26 | 27 | 28 | 29 | 30 | 31 | 32;

// Challenge: shortest way to represent the opcodes in type system?

/** All EVM [opcodes](https://www.evm.codes/), Shanghai version. */
// prettier-ignore
export type Op = 
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
`${'EXTCODE' | 'BLOCK'}HASH` |
// Block stuff
'COINBASE' | 'TIMESTAMP' | 'NUMBER' | 'PREVRANDAO' | 'GASLIMIT' | 'CHAINID' |
// Self balance
'SELFBALANCE' |
// Base fee
'BASEFEE' |
// Pop
'POP' |
// Load and store
`${'S' | 'M'}${'LOAD' | 'STORE'}` | `MSTORE8` |
// Jumps, PC, MSIZE and GAS
`JUMP${'' | 'I' | 'DEST'}` | 'PC' | 'MSIZE' | 'GAS' |
// Push, Dup and Swap
`PUSH${u5 | 0}` | `DUP${u4}` | `SWAP${u4}` |
// Log
`LOG${u2 | 0}` |
// Creates and calls
`CREATE${'' | '2'}` | `${'' | 'DELEGATE' | 'STATIC'}CALL` | 'CALLCODE' | 
// Terminations
'RETURN' | 'REVERT' | 'INVALID' | 'SELFDESTRUCT';

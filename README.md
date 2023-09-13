# `thuffs`

<img src="https://img.shields.io/badge/%E2%99%A5-14151B?logo=bun&logoColor=white" alt="bun love"/>

Write, test, and deploy Huff; without ever leaving TypeScript.

To install dependencies:

```bash
bun install
```

To run:

```bash
bun run index.ts
```

## Usage

Here is a Huff code (from Huff [docs](https://docs.huff.sh/tutorial/the-basics/#interacting-with-this-contract-externally)):

```rs
#define function addTwo(uint256,uint256) view returns(uint256)

#define macro ADD_TWO() = takes(0) returns(0) {
    0x04 calldataload     // load first 32 bytes onto the stack - number 1
    0x24 calldataload     // load second 32 bytes onto the stack - number 2
    add                   // add number 1 and 2 and put the result onto the stack

    0x00 mstore           // place the result in memory
    0x20 0x00 return      // return the result
}

#define macro MAIN() = takes(0) returns(0) {
    // get the function selector
    0x00 calldataload 0xE0 shr

    // jump to the implementation of the ADD_TWO function if the calldata matches the function selector
    __FUNC_SIG(addTwo) eq addTwo jumpi

    addTwo:
        ADD_TWO()
}
```

Here is that same code in Thuff:

```ts
import {Function, Label, Macro, Main} from './definitions';

const addTwoFunc = new Function({name: 'addTwo', args: ['uint256', 'uint256'], type: 'view', returns: ['uint256']});
const addTwoLabel = new Label('addTwo');

const ADD_TWO = new Macro(
  {name: 'ADD_TWO'},

  [0x04, 'CALLDATALOAD'], // load first 32 bytes onto the stack - number 1
  [0x24, 'CALLDATALOAD'], // load second 32 bytes onto the stack - number 2
  'ADD', //                  add number 1 and 2 and put the result onto the stack
  //
  [0b00, 'MSTORE'], //       place the result in memory
  [32, 0, 'RETURN'] //       return the result
);

const MAIN = new Main(
  // get function selector
  [0x00, 'CALLDATALOAD', 0xe0, 'SHR'],
  // jump to iplementation
  [addTwoFunc, 'EQ', addTwoLabel.src, 'JUMPI'],
  // handle jump
  [addTwoLabel.dest, ADD_TWO]
);
```

## See also

- <https://github.com/dethcrypto/evm-ts/blob/master/lib/opcodes/pop.ts>
- <https://twitter.com/Zac_Aztec/status/1697359614692430100>

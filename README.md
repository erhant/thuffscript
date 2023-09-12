# typehuff

Write, test, and deploy Huff; without every leaving TypeScript.

To install dependencies:

```bash
bun install
```

To run:

```bash
bun run index.ts
```

This project was created using `bun init` in bun v1.0.0. [Bun](https://bun.sh) is a fast all-in-one JavaScript runtime.

USE SYMBOLS TO GET THE HUFF CODE OF A DEFINITION

## Usage

Here is a Huff code (from Huff [docs](https://docs.huff.sh/tutorial/the-basics/#interacting-with-this-contract-externally)):

```rs
#define function addTwo(uint256,uint256) view returns(uint256)

#define macro MAIN() = takes(0) returns(0) {
    // Get the function selector
    0x00
    calldataload
    0xE0
    shr

    // Jump to the implementation of the ADD_TWO function if the calldata matches the function selector
    __FUNC_SIG(addTwo) eq addTwo jumpi

    addTwo:
        ADD_TWO()
}

#define macro ADD_TWO() = takes(0) returns(0) {
    0x04 calldataload     // load first 32 bytes onto the stack - number 1
    0x24 calldataload     // load second 32 bytes onto the stack - number 2
    add                   // add number 1 and 2 and put the result onto the stack

    0x00 mstore           // place the result in memory
    0x20 0x00 return      // return the result
}
```

Here is that same code in TypeHuff:

```ts
const addTwoFunc = new Function("addTwo", [uint256, uint256], "view", [
  uint256,
]);

const addTwoLabel = new Label("addTwo");

const addTwoMacro = new Macro("ADD_TWO").code(
  [0x00, CALLDATALOAD],
  [0x20, CALLDATALOAD],
  [ADD],
  [0x00, MSTORE],
  [0x20, 0x00, RETURN]
);
```

## See also

- <https://github.com/dethcrypto/evm-ts/blob/master/lib/opcodes/pop.ts>
- <https://twitter.com/Zac_Aztec/status/1697359614692430100>

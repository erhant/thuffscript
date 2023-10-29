<p align="center">
  <h1 align="center">
    <code>thuffscript</code>
  </h1>

  <div align="center">
      <a href="https://opensource.org/licenses/MIT" target="_blank">
          <img alt="License: MIT" src="https://img.shields.io/badge/license-MIT-yellow.svg">
      </a>
      <a href="https://www.npmjs.com/package/thuffscript" target="_blank">
        <img alt="NPM" src="https://img.shields.io/npm/v/thuffscript?logo=npm&color=CB3837">
    </a>
      <a href="./.github/workflows/tests.yml" target="_blank">
          <img alt="Workflow: Tests" src="https://github.com/erhant/thuffscript/actions/workflows/tests.yaml/badge.svg?branch=main">
      </a>
      
  </div>

  <p align="center">
    <i>Write Huff without ever leaving TypeScript.</i>
  </p>
</p>

## Install

Install the package via:

```sh
yarn add     thuffscript # yarn
npm  install thuffscript # npm
pnpm add     thuffscript # pnpm
bun  add     thuffscript # bun
```

## Usage

Thuffscript exposes a class for each Huff construct:

- `Macro` and `Fn` is used to write macros and functions.

  - `Main` and `Constructor` classes are also exported as a shorthand.
  - Instructions are type-safe, we only allow opcodes or other Huff constructs.
  - If the macro has arguments, TypeScript automatically allows `<arg-name>` within the instruction.
  - To get the macro size, use `macro.size` property.
  - To call a macro, use `macro.call()` function with the necessary arguments.

- `Test` is similar to `Macro`, but can accept a `calldata` and `value` for the test.

- `Label` is used to create jump labels. Each label object exports a jump source (`label.src`) and destination (`label.dest`) which can be used within a macro.

- `Constant` is used to define constant values.

  - Use `FreeStoragePointer` for the free storage pointer constants.

- `FunctionABI` and `EventABI` is used to describe a function interface and event interface.

  - A function interface also has a `function.label` property, which is a shorthand to create a `Label` for this function.

- `ErrorABI` is used to describe a custom error.

- `CodeTable`, `JumpTable` and `PackedJumpTable` are used to create tables.

### Compiling to Huff

Finally, a `Program` class is exported, which is what you will be using to compile all this to a Huff program. You can provide macros, functions, and tests to a program, and all of these, including the macros that have been used within them, will be compiled!

You can then call `program.compile` with optional metadata such as license, authors, etc. which will compile everything and assign it to `program.code` field. You can use `program.export` to export that code at some path.

> [!NOTE]
>
> **Thuffscript is not a tool to test or deploy Huff contracts**! You should simply use this to write & compile to Huff; the tests can be done via Foundry or Hardhat as is the case usually.
>
> Nevertheless, contributions are welcome for such integrations. :)

### Writing a Macro

When you are writing a macro (or a test, or a function), you provide the instructions (i.e. body of the macro) not to the constructor, but to the `body` function right after creating the object. This provides a nice type-safety when there are arguments for the macro.

The `body` function accepts arbitrarily many arguments, and each argument can be a single statement or an array of statements:

- Each argument corresponds to a line.
- Multiple statements within a single argument will be written to the same line.
- An empty array as an argument corresponds to an empty line.

Here is an example macro from SimpleStore:

```ts
const VALUE_LOCATION = new FreeStoragePointer('VALUE_LOCATION');

// ...

const GET_VALUE = new Macro('GET_VALUE').body(
  // load value from storage
  VALUE_LOCATION,
  'sload',
  [],
  // store value in memory
  [0x00, 'mstore'],
  [],
  // return value
  [0x20, 0x00, 'return']
);
```

This results in the following Huff code:

```c
#define constant VALUE_LOCATION = FREE_STORAGE_POINTER()

// ...

#define macro GET_VALUE() = takes(0) returns(0) {
    [VALUE_LOCATION]
    sload

    0x0 mstore

    0x20 0x0 return
}
```

## Examples

Several examples are provided under the [examples](./examples/) folder. You can run them via:

```sh
bun run eg:<example-name>
```

## Testing

After cloning the repo, install dependencies:

```sh
bun install
```

Then, run the tests:

```sh
bun test
```

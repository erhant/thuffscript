<p align="center">
  <h1 align="center">
    <code>thuffscript</code>
  </h1>

  <div align="center">
      <a href="https://opensource.org/licenses/MIT" target="_blank">
          <img alt="License: MIT" src="https://img.shields.io/badge/license-MIT-yellow.svg">
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

Thuffscript exposes a class for each Huff construct. We will explain the usage of each in this section.

> [!NOTE]
>
> **Thuffscript is not a tool to test or deploy Huff contracts**! You should simply use this to write & compile to Huff; the tests can be done via Foundry or Hardhat as is the case usually.

### Macros & Functions

TODO

### Function Interfaces & Events Interfaces & Custom Errors

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

import {FunctionABI, Label, Macro, Main, compile} from '../src';

const addConstantFunc = new FunctionABI('addConstant', {args: ['uint256'], type: 'view', returns: ['uint256']});
const addConstantLabel = new Label('addConstant');
const addConstant = new Macro('ADD_CONSTANT', {args: ['constant'], takes: 1}).body(
  [], // load argument to stack
  'add', // add number 1 and 2 and put the result onto the stack

  [0b00, 'mstore'], // place the result in memory
  [0x20, 0o00, 'return'] // return the result
).callable;

const foo = new Macro('FOO').body(
  'add', // add number 1 and 2 and put the result onto the stack

  [0b00, 'mstore'], // place the result in memory
  [0x20, 0o00, 'return'] // return the result
).callable;

const main = new Main().body(
  [0x00, 'calldataload', 0xe0, 'shr'], // get function selector
  [addConstantFunc, 'eq', addConstantLabel.src, 'jumpi'], // jump to iplementation

  addConstantLabel.dest,
  [0x04, 'calldataload']
  // addConstant({constant: 100})
);

const code = compile(main, {
  authors: ['erhant <https://github.com/erhant>'],
  description: 'An example addition with constant',
  license: 'UNLICENSED',
  title: 'Add Constant',
});
await Bun.write('./examples/add.huff', code);

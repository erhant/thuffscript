import {Macro, compile, FunctionABI, FreeStoragePointer, Main} from '../src';

// interface
const setValue = new FunctionABI('setValue', {args: ['uint256'], type: 'nonpayable'});
const getValue = new FunctionABI('setValue', {returns: ['uint256'], type: 'view'});

// storage slots
const VALUE_LOCATION = new FreeStoragePointer('VALUE_LOCATION');

// methods
const SET_VALUE = new Macro('SET_VALUE').body(
  [0x04, 'calldataload'], // [value]
  VALUE_LOCATION, // [ptr, value]
  'sstore' // []
);
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
const MAIN = new Main().body(
  [0x00, 'calldataload', 0xe0, 'shr'],
  ['dup1', setValue, 'eq', setValue.label.src, 'jumpi'],
  ['dup1', getValue, 'eq', getValue.label.src, 'jumpi'],
  [],
  [0x00, 0x00, 'revert'],
  [],
  [setValue.label.dest, SET_VALUE.call({})],
  [getValue.label.dest, GET_VALUE.call({})]
);

const code = compile(MAIN, {
  title: 'Simple Store',
  authors: ['https://github.com/huff-language/huff-project-template'],
  comments: ['https://github.com/huff-language/huff-project-template/blob/main/src/SimpleStore.huff'],
});
await Bun.write('./examples/SimpleStore.huff', code);

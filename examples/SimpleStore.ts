import {Macro, Program, FunctionABI, FreeStoragePointer, Main, MacroCall, Statements} from '../src';

// interface
const setValue = new FunctionABI('setValue', {args: ['uint256'], type: 'nonpayable'});
const getValue = new FunctionABI('getValue', {returns: ['uint256'], type: 'view'});

// storage slots
const VALUE_LOCATION = new FreeStoragePointer('VALUE_LOCATION');

// methods
const SET_VALUE = new Macro('SET_VALUE').body(
  [0x04, 'calldataload'], // [value]
  VALUE_LOCATION, //         [ptr, value]
  'sstore' //                []
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

// a small utility
function macrofunc(func: FunctionABI, call: MacroCall) {
  return {
    dispatch: ['dup1', func, 'eq', func.label.src, 'jumpi'] as Statements,
    handle: [func.label.dest, call] as Statements,
  };
}
const setValueMacrofunc = macrofunc(setValue, SET_VALUE.call({}));

const MAIN = new Main().body(
  [0x00, 'calldataload', 0xe0, 'shr'],
  setValueMacrofunc.dispatch,
  ['dup1', getValue, 'eq', getValue.label.src, 'jumpi'],
  [],
  [0x00, 0x00, 'revert'],
  [],
  setValueMacrofunc.handle,
  [getValue.label.dest, GET_VALUE.call({})]
);

new Program(MAIN)
  .compile({
    title: 'Simple Store',
    authors: ['https://github.com/huff-language/huff-project-template'],
    comments: ['https://github.com/huff-language/huff-project-template/blob/main/src/SimpleStore.huff'],
  })
  .export('./examples/SimpleStore.huff');

import {Macro, Program, FunctionABI, FreeStoragePointer, Main, Statements, MacroCall} from '../src';

const setValue = new FunctionABI('setValue', {args: ['uint256'], type: 'nonpayable'});
const getValue = new FunctionABI('getValue', {returns: ['uint256'], type: 'view'});
const VALUE_LOCATION = new FreeStoragePointer('VALUE_LOCATION');

// macros
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

// some utilities, since we are in JS world now :)
function macrofunc(func: FunctionABI, call: MacroCall): {dispatch: Statements; handle: Statements} {
  return {
    dispatch: ['dup1', func, 'eq', func.label.src, 'jumpi'],
    handle: [func.label.dest, call],
  };
}
const setValueMacrofunc = macrofunc(setValue, SET_VALUE.call({}));
const getValueMacroFunc = macrofunc(getValue, GET_VALUE.call({}));
const revert: Statements = [0x00, 0x00, 'revert'];

const MAIN = new Main().body(
  [0x00, 'calldataload', 0xe0, 'shr'],
  setValueMacrofunc.dispatch,
  getValueMacroFunc.dispatch,
  [],
  revert,
  [],
  setValueMacrofunc.handle,
  getValueMacroFunc.handle
);

new Program(MAIN)
  .compile({
    title: 'Simple Store',
    authors: ['https://github.com/huff-language/huff-project-template'],
    comments: ['https://github.com/huff-language/huff-project-template/blob/main/src/SimpleStore.huff'],
  })
  .export('./examples/SimpleStore.huff');

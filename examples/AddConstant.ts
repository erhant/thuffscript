import {FunctionABI, Macro, Main, Program} from '../src';

const addConstant = new FunctionABI('addConstant', {args: ['uint'], returns: ['uint'], type: 'view'});

const ADD_CONSTANT = new Macro('ADD_CONSTANT', {args: ['amount'], takes: 1, returns: 1}).body('<amount>', 'add');

const MAIN = new Main().body(
  [0x00, 'calldataload', 0xe0, 'shr'],
  ['dup1', addConstant, 'eq', addConstant.label.src, 'jumpi'],
  [],
  [0x00, 0x00, 'revert'],
  [],
  [
    addConstant.label.dest,
    ADD_CONSTANT.call({
      amount: 0x1234,
    }),
  ]
);

const program = new Program(MAIN).compile({
  title: 'AddConstant',
  comments: ['Very simple example where we add a constant to some value.'],
});

export default program;

if (import.meta.main) {
  await program.export('./examples/AddConstant.huff');
}

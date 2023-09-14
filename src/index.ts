import {Function, Label, Macro, Main} from './definitions';
import {Program} from './program';

const addConstantFunc = new Function('addConstant', {args: ['uint256'], type: 'view', returns: ['uint256']});
const addConstantLabel = new Label('addConstant');
const addConstant = new Macro('ADD_CONSTANT', {args: ['constant'], takes: 1}).body(
  ['<constant>'], // load argument to stack
  'ADD', // add number 1 and 2 and put the result onto the stack

  [0b00, 'MSTORE'], // place the result in memory
  [32, 0, 'RETURN'] // return the result
);

const main = new Main(
  [0x00, 'CALLDATALOAD', 0xe0, 'SHR'], // get function selector
  [addConstantFunc, 'EQ', addConstantLabel.src, 'JUMPI'], // jump to iplementation

  // handle jump
  addConstantLabel.dest,
  [
    0x04,
    'CALLDATALOAD',
    addConstant({
      constant: 0x0,
    }),
  ]
);

new Program(main);

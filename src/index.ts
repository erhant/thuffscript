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

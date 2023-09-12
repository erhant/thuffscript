import {Macro} from './definitions/macro';

console.log('how to huff type!');

const addTwo = new Macro('ADD_TWO').code(
  [0x04, 'CALLDATALOAD'], // load first 32 bytes onto the stack - number 1
  [0x24, 'CALLDATALOAD'], // load second 32 bytes onto the stack - number 2
  ['ADD'], //                add number 1 and 2 and put the result onto the stack
  [],
  [0x00, 'MSTORE'], //       place the result in memory
  [0x20, 0x00, 'RETURN'] //  return the result
);

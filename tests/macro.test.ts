import {describe, it, expect} from 'bun:test';
import {Function, Label, Macro, Main, compile} from '../src/';

describe('macros', () => {
  it('add constant', () => {
    const addConstantFunc = new Function('addConstant', {args: ['uint256'], type: 'view', returns: ['uint256']});
    const addConstantLabel = new Label('addConstantLabel');
    const addConstantMacro = new Macro('ADD_CONSTANT', {args: ['constant'], takes: 1}).body(
      ['<constant>', 'add'],
      [0b00, 'mstore'],
      [0x20, 0o00, 'return']
    );
    const addConstantCallable = addConstantMacro.callable;

    const subConstantMacro = new Macro('SUB_CONSTANT', {args: ['constant'], takes: 1}).body(
      ['<constant>', 'sub'],
      [0b00, 'mstore'],
      [0x20, 0o00, 'return']
    );
    const subConstantCallable = subConstantMacro.callable;

    const main = new Main(
      [0x00, 'calldataload', 0xe0, 'shr'], // get function selector
      [addConstantFunc, 'eq', addConstantLabel.src, 'jumpi'], // jump to iplementation
      [],
      addConstantLabel.dest,
      [0x04, 'calldataload'],
      [],
      addConstantCallable({
        constant: 100,
      }),
      subConstantCallable({
        constant: 100,
      })
    );

    const huff = compile(main);
    // console.log(huff);
  });
});

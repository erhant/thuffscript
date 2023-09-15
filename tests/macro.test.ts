import {describe, it, expect} from 'bun:test';
import {Function, Label, Macro, Main, compile} from '../src/';

describe('macros', () => {
  it('add constant', () => {
    const addConstantFunc = new Function('addConstant', {args: ['uint256'], type: 'view', returns: ['uint256']});
    const addConstantLabel = new Label('addConstantLabel');
    const addConstantMacro = new Macro('ADD_CONSTANT', {args: ['constant'], takes: 1}).body(
      ['<constant>', 'ADD'],
      [0b00, 'MSTORE'],
      [0x20, 0o00, 'RETURN']
    );
    const addConstantCallable = addConstantMacro.callable;

    const subConstantMacro = new Macro('SUB_CONSTANT', {args: ['constant'], takes: 1}).body(
      ['<constant>', 'SUB'],
      [0b00, 'MSTORE'],
      [0x20, 0o00, 'RETURN']
    );
    const subConstantCallable = subConstantMacro.callable;

    const main = new Main(
      [0x00, 'CALLDATALOAD', 0xe0, 'SHR'], // get function selector
      [addConstantFunc, 'EQ', addConstantLabel.src, 'JUMPI'], // jump to iplementation
      [],
      addConstantLabel.dest,
      [0x04, 'CALLDATALOAD'],
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

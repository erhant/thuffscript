import {describe, it} from 'bun:test';
import {FunctionABI, Label, Macro, Main, compile} from '../src/';

describe('macros', () => {
  it('add constant', () => {
    const addConstantFunc = new FunctionABI('addConstant', {args: ['uint256'], type: 'view', returns: ['uint256']});
    const addConstantLabel = new Label('addConstantLabel');
    const addConstant = new Macro('ADD_CONSTANT', {args: ['constant'], takes: 1}).body(
      ['<constant>', 'add'],
      [0b00, 'mstore'],
      [0x20, 0o00, 'return']
    );

    const subConstant = new Macro('SUB_CONSTANT', {takes: 1}).body(
      [0x1234, 'sub'],
      [0b00, 'mstore', '<3fs>'],
      [0x20, 0o00, 'return']
    );

    const main = new Main().body(
      [0x00, 'calldataload', 0xe0, 'shr'], // get function selector
      [addConstantFunc, 'eq', addConstantLabel.src, 'jumpi'], // jump to iplementation
      [],
      addConstantLabel.dest,
      [0x04, 'calldataload'],
      [],
      addConstant.call({
        constant: 100,
      }),
      subConstant.call({
        constant: 100,
      })
    );

    const huff = compile(main);
    console.log(huff);
  });
});

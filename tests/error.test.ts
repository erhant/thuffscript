import {describe, it, expect} from 'bun:test';
import {ErrorABI} from '../src';

describe('error', () => {
  it('no arguments', () => {
    const error = new ErrorABI('NoArg');

    expect(error.isDeclared).toBeFalse();
    const declaration = error.declare();
    expect(declaration.decl).toBe('#define error NoArg()');
    expect(declaration.type).toBe('error');
    expect(declaration.name).toBe('NoArg');
    expect(error.isDeclared).toBeTrue();

    expect(error.define()).toBe('__ERROR(NoArg)');
  });

  it('arguments', () => {
    // https://github.com/huff-language/huffmate/blob/main/src/tokens/ERC20.huff
    const error = new ErrorABI('Arg', ['uint256', 'int120']);

    expect(error.isDeclared).toBeFalse();
    const declaration = error.declare();
    expect(declaration.decl).toBe('#define error Arg(uint256, int120)');
    expect(declaration.type).toBe('error');
    expect(declaration.name).toBe('Arg');
    expect(error.isDeclared).toBeTrue();

    expect(error.define()).toBe('__ERROR(Arg)');
  });
});

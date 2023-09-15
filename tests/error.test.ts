import {describe, it, expect} from 'bun:test';
import {CustomError} from '../src';

describe('custom errors', () => {
  it('panic', () => {
    // https://github.com/huff-language/huffmate/blob/main/src/tokens/ERC20.huff
    const error = new CustomError('Panic', ['uint256']);

    expect(error.isDeclared).toBeFalse();
    const declaration = error.declare();
    expect(declaration.decl).toBe('#define error Panic(uint256)');
    expect(declaration.type).toBe('error');
    expect(declaration.name).toBe('Panic');
    expect(error.isDeclared).toBeTrue();

    expect(error.define()).toBe('__ERROR(Panic)');
  });
});

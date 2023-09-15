import {describe, it, expect} from 'bun:test';
import {CustomError, Event, declare, define} from '../src/definitions';

describe('custom errors', () => {
  it('panic', () => {
    // https://github.com/huff-language/huffmate/blob/main/src/tokens/ERC20.huff
    const error = new CustomError('Panic', ['uint256']);
    expect(error.isDeclared).toBeFalse();
    expect(errordeclare()).toBe('#define error Panic(uint256)');
    expect(error.isDeclared).toBeTrue();
    expect(errordefine()).toBe('__ERROR(Panic)');
  });
});

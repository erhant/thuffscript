import {describe, it, expect} from 'bun:test';
import {Function} from '../src';
import {declare, define} from '../src/definitions';

describe('function interfaces', () => {
  it('set owner', () => {
    // https://github.com/huff-language/huffmate/blob/main/src/auth/Owned.huff
    const func = new Function('setOwner', {args: ['address'], type: 'nonpayable'});
    expect(func.isDeclared).toBeFalse();
    expect(funcdeclare()).toBe('#define function setOwner(address) nonpayable returns ()');
    expect(func.isDeclared).toBeTrue();
    expect(funcdefine()).toBe('__FUNC_SIG(setOwner)');
  });

  it('max', () => {
    // https://github.com/huff-language/huffmate/blob/main/src/math/Math.huff
    const func = new Function('max', {args: ['uint256', 'uint256'], type: 'pure', returns: ['uint256']});
    expect(func.isDeclared).toBeFalse();
    expect(funcdeclare()).toBe('#define function max(uint256, uint256) pure returns (uint256)');
    expect(func.isDeclared).toBeTrue();
    expect(funcdefine()).toBe('__FUNC_SIG(max)');
  });
});

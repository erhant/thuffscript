import {describe, it, expect} from 'bun:test';
import {FunctionABI} from '../src';

describe('function', () => {
  it('arguments', () => {
    const func = new FunctionABI('args', {args: ['address'], type: 'nonpayable'});
    expect(func.isDeclared).toBeFalse();
    expect(func.declare().decl).toBe('#define function args(address) nonpayable returns ()');
    expect(func.isDeclared).toBeTrue();
    expect(func.define()).toBe('__FUNC_SIG(args)');
  });

  it('returns', () => {
    // https://github.com/huff-language/huffmate/blob/main/src/math/Math.huff
    const func = new FunctionABI('doesreturn', {args: ['uint256', 'uint256'], type: 'pure', returns: ['uint256']});
    expect(func.isDeclared).toBeFalse();
    expect(func.declare().decl).toBe('#define function doesreturn(uint256, uint256) pure returns (uint256)');
    expect(func.isDeclared).toBeTrue();
    expect(func.define()).toBe('__FUNC_SIG(doesreturn)');
  });

  it('no type', () => {
    // https://github.com/huff-language/huffmate/blob/main/src/math/Math.huff
    const func = new FunctionABI('notype', {args: ['uint16'], returns: ['uint32']});
    expect(func.isDeclared).toBeFalse();
    expect(func.declare().decl).toBe('#define function notype(uint16) returns (uint32)');
    expect(func.isDeclared).toBeTrue();
    expect(func.define()).toBe('__FUNC_SIG(notype)');
  });
});

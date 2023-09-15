import {describe, it, expect} from 'bun:test';
import {Constant, declare, define} from '../src/definitions';

describe('constants', () => {
  it('neg', () => {
    // https://github.com/huff-language/huffmate/blob/main/src/math/Math.huff
    const constant = new Constant('NEG1', 0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffn);
    expect(constantdeclare()).toBe(
      '#define constant NEG1 = 0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff'
    );
    expect(constantdefine()).toBe('[NEG1]');
  });

  it('free storage pointer', () => {
    const constant = new Constant('SLOT', 'FREE_STORAGE_POINTER()');
    expect(constantdeclare()).toBe('#define constant SLOT = FREE_STORAGE_POINTER()');
    expect(constantdefine()).toBe('[SLOT]');
  });
});

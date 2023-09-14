import {describe, it, expect} from 'bun:test';
import {Constant, declare, define} from '../src/definitions';

describe('constants', () => {
  it('neg', () => {
    // https://github.com/huff-language/huffmate/blob/main/src/math/Math.huff
    const constant = new Constant('NEG1', 0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffn);
    expect(constant[declare]()).toBe(
      '#define constant NEG1 = 0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff'
    );
    expect(constant[define]()).toBe('[NEG1]');
  });

  it('free storage pointer', () => {
    const constant = new Constant('SLOT', 'FREE_STORAGE_POINTER()');
    expect(constant[declare]()).toBe('#define constant SLOT = FREE_STORAGE_POINTER()');
    expect(constant[define]()).toBe('[SLOT]');
  });
});

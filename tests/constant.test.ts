import {describe, it, expect} from 'bun:test';
import {Constant, declare, define} from '../src/definitions';

describe('constants', () => {
  it('neg', () => {
    // https://github.com/huff-language/huffmate/blob/main/src/math/Math.huff
    const neg = new Constant('NEG1', 0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffn);
    expect(neg[declare]()).toBe(
      '#define constant NEG1 = 0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff'
    );
    expect(neg[define]()).toBe('[NEG1]');
  });
});

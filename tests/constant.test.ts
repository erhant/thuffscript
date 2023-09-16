import {describe, it, expect} from 'bun:test';
import {Constant, FreeStoragePointer} from '../src/definitions';

describe('constants', () => {
  it('neg', () => {
    // https://github.com/huff-language/huffmate/blob/main/src/math/Math.huff
    const constant = new Constant('NEG1', 0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffn);

    expect(constant.isDeclared).toBeFalse();
    const declaration = constant.declare();
    expect(declaration.decl).toBe(
      '#define constant NEG1 = 0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff'
    );
    expect(declaration.type).toBe('constant');
    expect(declaration.name).toBe('NEG1');
    expect(constant.isDeclared).toBeTrue();

    expect(constant.define()).toBe('[NEG1]');
  });

  it('free storage pointer', () => {
    const constant = new FreeStoragePointer('SLOT');

    expect(constant.isDeclared).toBeFalse();
    const declaration = constant.declare();
    expect(declaration.decl).toBe('#define constant SLOT = FREE_STORAGE_POINTER()');
    expect(declaration.type).toBe('constant');
    expect(declaration.name).toBe('SLOT');
    expect(constant.isDeclared).toBeTrue();

    expect(constant.define()).toBe('[SLOT]');
  });
});

import {describe, test, expect} from 'bun:test';
import {Constant, FreeStoragePointer} from '../src';

describe('constant', () => {
  test('declaration', () => {
    const declarable = new Constant('name', 0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffn);

    expect(declarable.isDeclared).toBeFalse();
    const declaration = declarable.declare();
    expect(declarable.isDeclared).toBeTrue();

    expect(declaration.type).toBe('constant');
    expect(declaration.name).toBe('name');
    expect(declarable.define()).toBe('[name]');

    expect(() => declarable.declare()).toThrow('already declared');
  });

  test('literal', () => {
    const constant = new Constant('NEG1', 0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffn);
    expect(constant.declare().decl).toBe(
      '#define constant NEG1 = 0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff'
    );
  });

  test('free storage pointer', () => {
    const constant = new FreeStoragePointer('SLOT');
    expect(constant.declare().decl).toBe('#define constant SLOT = FREE_STORAGE_POINTER()');
    expect(constant.define()).toBe('[SLOT]');
  });
});

import {describe, test, expect} from 'bun:test';
import {CodeTable, JumpTable, Label, PackedJumpTable} from '../src';

describe('tables', () => {
  const JUMPS = [new Label('1'), new Label('2'), new Label('3')];

  test('jumptable', () => {
    const table = new JumpTable('Table', JUMPS);

    expect(table.isDeclared).toBeFalse();
    const declaration = table.declare();
    expect(table.isDeclared).toBeTrue();

    expect(declaration.type).toBe('table');
    expect(declaration.name).toBe('Table');
    expect(declaration.decl).toBe(`#define jumptable {
    1 2 3
}`);

    expect(() => table.define()).toThrow('table has no definition');
  });

  test('packed jumptable', () => {
    const table = new PackedJumpTable('Table', JUMPS);

    expect(table.isDeclared).toBeFalse();
    const declaration = table.declare();
    expect(table.isDeclared).toBeTrue();

    expect(declaration.type).toBe('table');
    expect(declaration.name).toBe('Table');
    expect(declaration.decl).toBe(`#define jumptable__packed {
    1 2 3
}`);

    expect(() => table.define()).toThrow('table has no definition');
  });

  test('codetable', () => {
    const table = new CodeTable('Table', 0x1234abcd);

    expect(table.isDeclared).toBeFalse();
    const declaration = table.declare();
    expect(table.isDeclared).toBeTrue();

    expect(declaration.type).toBe('table');
    expect(declaration.name).toBe('Table');
    expect(declaration.decl).toBe(`#define table {
    0x1234abcd
}`);

    expect(() => table.define()).toThrow('table has no definition');
  });

  test('table start', () => {
    const table = new JumpTable('Table', JUMPS);
    expect(table.start.define()).toBe('__tablestart(Table)');
  });

  test('table size', () => {
    const table = new JumpTable('Table', JUMPS);
    expect(table.size.define()).toBe('__tablesize(Table)');
  });
});

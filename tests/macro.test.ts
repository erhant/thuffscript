import {describe, expect, test} from 'bun:test';
import {Macro} from '../src';

describe('macro', () => {
  test('arguments', () => {
    // prettier-ignore
    const code = new Macro('WithArgs', {args: ['foo', 'bar']}).body(
      [0x1234, '<bar>'], 
      [0b00, 'mstore'], 
      [0x20, 0o00, 'return']
    ).compile().body;

    expect(code).toBe(`#define macro WithArgs(bar, foo) = takes(0) returns(0) {
    0x1234 <bar>
    0x0 mstore
    0x20 0x0 return
}`);
  });

  test('empty lines', () => {
    // prettier-ignore
    const code = new Macro('Foo').body(
      ['address'],
      [],
      ['selfbalance'],
      [],
      ['return']
    ).compile().body;
    expect(code).toBe(`#define macro Foo() = takes(0) returns(0) {
    address
    
    selfbalance
    
    return
}`);
  });
});

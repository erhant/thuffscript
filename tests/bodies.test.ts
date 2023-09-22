import {describe, expect, it} from 'bun:test';
import {Macro} from '../src';

describe('macro', () => {
  it('arguments', () => {
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

  it('empty lines', () => {
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

describe('#define test', () => {
  it('no decorators', () => {
    // prettier-ignore
    const test = new Test('WithArgs').body(
      0x1, 
      0x2,
    );
    expect(test.compile().body).toBe(`#define test WithArgs() = {
    0x1
    0x2
}`);
  });

  it('with value', () => {
    // prettier-ignore
    const test = new Test('WithValue', {
      value: 0x9999
    }).body(
      0x1, 
      0x2,
    );
    expect(test.compile().body).toBe(`#[value(0x9999)]
#define test WithValue() = {
    0x1
    0x2
}`);
  });

  it('with calldata', () => {
    // prettier-ignore
    const test = new Test('WithCalldata', {
      calldata: 0xDEADBEEF
    }).body(
      0x1, 
      0x2,
    );
    expect(test.compile().body).toBe(`#[calldata("0xdeadbeef")]
#define test WithCalldata() = {
    0x1
    0x2
}`);
  });

  it('with value & calldata', () => {
    // prettier-ignore
    const test = new Test('WithAll', {
      calldata: 0xDEADBEEF,
      value: 0x9999
    }).body(
      0x1, 
      0x2,
    );
    expect(test.compile().body).toBe(`#[calldata("0xdeadbeef"), value(0x9999)]
#define test WithAll() = {
    0x1
    0x2
}`);
  });
});

import {describe, expect, test} from 'bun:test';
import {Test} from '../src';

describe('test', () => {
  test('no decorators', () => {
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

  test('with value', () => {
    const test = new Test('WithValue', {
      value: 0x9999,
    }).body([0x1, 0x2]);
    expect(test.compile().body).toBe(`#[value(0x9999)]
#define test WithValue() = {
    0x1 0x2
}`);
  });

  test('with calldata', () => {
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

  test('with value & calldata', () => {
    // prettier-ignore
    const test = new Test('WithAll', {
      calldata: 0xcafe1234,
      value: 0x9999
    }).body(
      0x1, 
      [],
      0x2,
    );
    expect(test.compile().body).toBe(`#[calldata("0xcafe1234"), value(0x9999)]
#define test WithAll() = {
    0x1
    
    0x2
}`);
  });
});

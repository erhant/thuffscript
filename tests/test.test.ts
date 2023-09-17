import {describe, it} from 'bun:test';
import {Test} from '../src';

// TODO

describe('#define test', () => {
  it('no decorators', () => {
    // prettier-ignore
    const test = new Test('WithArgs').body(
      0x1, 
      0x2,
    );
  });

  it('with value', () => {
    // prettier-ignore
    const test = new Test('WithArgs').body(
      [0x1234, '<bar>'], 
      [0b00, 'mstore'], 
      [0x20, 0o00, 'return']
    );
  });

  it('with calldata', () => {
    // prettier-ignore
    const test = new Test('WithArgs').body(
      [0x1234, '<bar>'], 
      [0b00, 'mstore'], 
      [0x20, 0o00, 'return']
    );
  });

  it('with value & calldata', () => {
    // prettier-ignore
    const test = new Test('WithArgs').body(
      [0x1234, '<bar>'], 
      [0b00, 'mstore'], 
      [0x20, 0o00, 'return']
    );
  });
});

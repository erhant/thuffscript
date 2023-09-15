import {describe, it, expect} from 'bun:test';
import {Label} from '../src/';

describe('jump labels', () => {
  it('foobar', () => {
    const label = new Label('foobar');
    expect(label.src.define()).toBe('foobar');
    expect(label.dest.define()).toBe('foobar:');
  });
});

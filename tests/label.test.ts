import {describe, it, expect} from 'bun:test';
import {Label} from '../src/';

describe('jump labels', () => {
  it('source & destination', () => {
    const label = new Label('label');
    expect(label.src.define()).toBe('label');
    expect(label.dest.define()).toBe('label:');
  });

  it('fail on multiple destinations', () => {
    const label = new Label('label');
    expect(label.dest.define()).toBe('label:');
    expect(() => label.dest.define()).toThrow('destination already placed');
  });
});

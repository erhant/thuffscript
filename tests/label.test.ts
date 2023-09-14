import {describe, it, expect} from 'bun:test';
import {Event, Label, declare, define} from '../src/definitions';

describe('jump labels', () => {
  it('foobar', () => {
    const label = new Label('foobar');
    expect(label.src()).toBe('foobar');
    expect(label.isDestPlaced).toBeFalse();
    expect(label.dest()).toBe('foobar:');
    expect(label.isDestPlaced).toBeTrue();
  });
});

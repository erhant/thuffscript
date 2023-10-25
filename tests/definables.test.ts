import {describe, it, expect} from 'bun:test';
import {Label} from '../src';

describe('labels', () => {
  it('source & destination', () => {
    const label = new Label('label');
    expect(label.src.define()).toBe('label');
    expect(label.dest.define()).toBe('label:');
  });
});

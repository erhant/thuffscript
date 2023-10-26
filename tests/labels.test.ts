import {describe, test, expect} from 'bun:test';
import {Label} from '../src';

describe('labels', () => {
  test('source & destination', () => {
    const label = new Label('label');
    expect(label.src.define()).toBe('label');
    expect(label.dest.define()).toBe('label:');
  });
});

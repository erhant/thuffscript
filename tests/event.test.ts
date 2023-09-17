import {describe, it, expect} from 'bun:test';
import {EventABI} from '../src/';

describe('event', () => {
  it('arguments', () => {
    const event = new EventABI('Args', ['address', 'address indexed', 'uint256']);

    expect(event.isDeclared).toBeFalse();
    const declaration = event.declare();
    expect(declaration.decl).toBe('#define event Args(address, address indexed, uint256)');
    expect(declaration.type).toBe('event');
    expect(declaration.name).toBe('Args');
    expect(event.isDeclared).toBeTrue();

    expect(event.define()).toBe('__EVENT_HASH(Args)');
  });

  it('no arguments', () => {
    const event = new EventABI('NoArgs');

    expect(event.isDeclared).toBeFalse();
    const declaration = event.declare();
    expect(declaration.decl).toBe('#define event NoArgs()');
    expect(declaration.type).toBe('event');
    expect(declaration.name).toBe('NoArgs');
    expect(event.isDeclared).toBeTrue();

    expect(event.define()).toBe('__EVENT_HASH(NoArgs)');
  });
});

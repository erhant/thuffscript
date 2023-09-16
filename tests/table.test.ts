import {describe, it, expect} from 'bun:test';
import {EventABI} from '../src';

describe('jump & code tables', () => {
  it('transfer', () => {
    // https://github.com/huff-language/huffmate/blob/main/src/tokens/ERC20.huff
    const event = new EventABI('Transfer', ['address', 'address', 'uint256']);

    expect(event.isDeclared).toBeFalse();
    const declaration = event.declare();
    expect(declaration.decl).toBe('#define event Transfer(address, address, uint256)');
    expect(declaration.type).toBe('event');
    expect(declaration.name).toBe('Transfer');
    expect(event.isDeclared).toBeTrue();

    expect(event.define()).toBe('__EVENT_HASH(Transfer)');
  });
});

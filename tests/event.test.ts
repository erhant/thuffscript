import {describe, it, expect} from 'bun:test';
import {Event, declare, define} from '../src/definitions';

describe('event interfaces', () => {
  it('transfer', () => {
    // https://github.com/huff-language/huffmate/blob/main/src/tokens/ERC20.huff
    const event = new Event('Transfer', ['address', 'address', 'uint256']);
    expect(event.isDeclared).toBeFalse();
    expect(event[declare]()).toBe('#define event Transfer(address, address, uint256)');
    expect(event.isDeclared).toBeTrue();
    expect(event[define]()).toBe('__EVENT_HASH(Transfer)');
  });
});

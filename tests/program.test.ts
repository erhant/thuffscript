import {describe, test, expect} from 'bun:test';
import Address from '../examples/Address';
import AddConstant from '../examples/AddConstant';
import SimpleStore from '../examples/SimpleStore';
import {Constructor, Main, Program} from '../src';

describe('programs', () => {
  describe('edge cases', () => {
    test('two mains', () => {
      expect(() => new Program([new Main(), new Main()])).toThrow('there cant be multiple MAIN macros');
    });

    test('two construcotrs', () => {
      expect(() => new Program([new Constructor(), new Constructor()])).toThrow(
        'there cant be multiple CONSTRUCTOR macros'
      );
    });
  });

  describe('examples', () => {
    test('AddConstant', async () => {
      const code = AddConstant.compile().code;
      const expected = await Bun.file('./examples/AddConstant.huff').text();
      expect(code).toBe(expected);
    });

    test('Address', async () => {
      const code = Address.compile().code;
      const expected = await Bun.file('./examples/Address.huff').text();
      expect(code).toBe(expected);
    });

    test('SimpleStore', async () => {
      const code = SimpleStore.compile().code;
      const expected = await Bun.file('./examples/SimpleStore.huff').text();
      expect(code).toBe(expected);
    });
  });
});

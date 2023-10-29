import {describe, test, expect} from 'bun:test';
import {ErrorABI, EventABI, FunctionABI} from '../src';

describe('error', () => {
  test('declaration', () => {
    const declarable = new ErrorABI('name');

    expect(declarable.isDeclared).toBeFalse();
    const declaration = declarable.declare();
    expect(declarable.isDeclared).toBeTrue();

    expect(declaration.type).toBe('error');
    expect(declaration.name).toBe('name');
    expect(declarable.define()).toBe('__ERROR(name)');

    expect(() => declarable.declare()).toThrow('already declared');
  });

  test('with arguments', () => {
    const error = new ErrorABI('Arg', ['uint256', 'int120']);
    expect(error.declare().decl).toBe('#define error Arg(uint256, int120)');
  });

  test('without arguments', () => {
    const error = new ErrorABI('NoArg');
    expect(error.declare().decl).toBe('#define error NoArg()');
  });
});

describe('event', () => {
  test('declaration', () => {
    const declarable = new EventABI('name');

    expect(declarable.isDeclared).toBeFalse();
    const declaration = declarable.declare();
    expect(declarable.isDeclared).toBeTrue();

    expect(declaration.type).toBe('event');
    expect(declaration.name).toBe('name');
    expect(declarable.define()).toBe('__EVENT_HASH(name)');

    expect(() => declarable.declare()).toThrow('already declared');
  });

  test('arguments', () => {
    const event = new EventABI('Args', ['address', 'address indexed', 'uint256']);
    expect(event.declare().decl).toBe('#define event Args(address, address indexed, uint256)');
    expect(event.define()).toBe('__EVENT_HASH(Args)');
  });

  test('no arguments', () => {
    const event = new EventABI('NoArgs');
    expect(event.declare().decl).toBe('#define event NoArgs()');
    expect(event.define()).toBe('__EVENT_HASH(NoArgs)');
  });
});

describe('function', () => {
  test('declaration', () => {
    const declarable = new FunctionABI('name');

    expect(declarable.isDeclared).toBeFalse();
    const declaration = declarable.declare();
    expect(declarable.isDeclared).toBeTrue();

    expect(declaration.type).toBe('function');
    expect(declaration.name).toBe('name');
    expect(declarable.define()).toBe('__FUNC_SIG(name)');

    expect(() => declarable.declare()).toThrow('already declared');
  });

  test('with arguments', () => {
    const func = new FunctionABI('args', {args: ['address'], type: 'nonpayable'});
    expect(func.declare().decl).toBe('#define function args(address) nonpayable returns ()');
    expect(func.define()).toBe('__FUNC_SIG(args)');
  });

  test('with returns', () => {
    const func = new FunctionABI('doesreturn', {args: ['uint256', 'uint256'], type: 'pure', returns: ['uint256']});
    expect(func.declare().decl).toBe('#define function doesreturn(uint256, uint256) pure returns (uint256)');
  });

  test('no function type', () => {
    // defaults to `nonpayable`
    const func = new FunctionABI('notype', {args: ['uint16'], returns: ['uint32']});
    expect(func.declare().decl).toBe('#define function notype(uint16) nonpayable returns (uint32)');
  });
});

import {describe, it, expect} from 'bun:test';
import {Constant, ErrorABI, EventABI, FreeStoragePointer, FunctionABI} from '../src';

describe('constant', () => {
  it('declarable', () => {
    const declarable = new Constant('name', 0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffn);

    expect(declarable.isDeclared).toBeFalse();
    const declaration = declarable.declare();
    expect(declarable.isDeclared).toBeTrue();

    expect(declaration.type).toBe('constant');
    expect(declaration.name).toBe('name');
    expect(declarable.define()).toBe('[name]');

    expect(() => declarable.declare()).toThrow('already declared');
  });

  it('literal', () => {
    const constant = new Constant('NEG1', 0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffn);
    expect(constant.declare().decl).toBe(
      '#define constant NEG1 = 0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff'
    );
  });

  it('free storage pointer', () => {
    const constant = new FreeStoragePointer('SLOT');
    expect(constant.declare().decl).toBe('#define constant SLOT = FREE_STORAGE_POINTER()');
  });
});

describe('error', () => {
  it('declarable', () => {
    const declarable = new ErrorABI('name');

    expect(declarable.isDeclared).toBeFalse();
    const declaration = declarable.declare();
    expect(declarable.isDeclared).toBeTrue();

    expect(declaration.type).toBe('error');
    expect(declaration.name).toBe('name');
    expect(declarable.define()).toBe('__ERROR(name)');

    expect(() => declarable.declare()).toThrow('already declared');
  });

  it('with arguments', () => {
    const error = new ErrorABI('Arg', ['uint256', 'int120']);
    expect(error.declare().decl).toBe('#define error Arg(uint256, int120)');
  });

  it('without arguments', () => {
    const error = new ErrorABI('NoArg');
    expect(error.declare().decl).toBe('#define error NoArg()');
  });
});

describe('event', () => {
  it('declarable', () => {
    const declarable = new EventABI('name');

    expect(declarable.isDeclared).toBeFalse();
    const declaration = declarable.declare();
    expect(declarable.isDeclared).toBeTrue();

    expect(declaration.type).toBe('event');
    expect(declaration.name).toBe('name');
    expect(declarable.define()).toBe('__EVENT_HASH(name)');

    expect(() => declarable.declare()).toThrow('already declared');
  });

  it('arguments', () => {
    const event = new EventABI('Args', ['address', 'address indexed', 'uint256']);
    expect(event.declare().decl).toBe('#define event Args(address, address indexed, uint256)');
    expect(event.define()).toBe('__EVENT_HASH(Args)');
  });

  it('no arguments', () => {
    const event = new EventABI('NoArgs');
    expect(event.declare().decl).toBe('#define event NoArgs()');
    expect(event.define()).toBe('__EVENT_HASH(NoArgs)');
  });
});

describe('function', () => {
  it('declarable', () => {
    const declarable = new FunctionABI('name');

    expect(declarable.isDeclared).toBeFalse();
    const declaration = declarable.declare();
    expect(declarable.isDeclared).toBeTrue();

    expect(declaration.type).toBe('function');
    expect(declaration.name).toBe('name');
    expect(declarable.define()).toBe('__FUNC_SIG(name)');

    expect(() => declarable.declare()).toThrow('already declared');
  });

  it('with arguments', () => {
    const func = new FunctionABI('args', {args: ['address'], type: 'nonpayable'});
    expect(func.declare().decl).toBe('#define function args(address) nonpayable returns ()');
    expect(func.define()).toBe('__FUNC_SIG(args)');
  });

  it('with returns', () => {
    const func = new FunctionABI('doesreturn', {args: ['uint256', 'uint256'], type: 'pure', returns: ['uint256']});
    expect(func.declare().decl).toBe('#define function doesreturn(uint256, uint256) pure returns (uint256)');
  });

  it('no function type', () => {
    const func = new FunctionABI('notype', {args: ['uint16'], returns: ['uint32']});
    expect(func.declare().decl).toBe('#define function notype(uint16) returns (uint32)');
  });
});

describe.todo('tables', () => {
  it('jumptable', () => {
    //
  });

  it('packed jumptable', () => {
    //
  });

  it('codetable', () => {
    //
  });
});

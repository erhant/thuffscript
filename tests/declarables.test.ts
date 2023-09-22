import {describe, it, expect} from 'bun:test';
import {Constant, FreeStoragePointer} from '../src/definables';

describe('constant', () => {
  it('literal', () => {
    const constant = new Constant('NEG1', 0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffn);

    expect(constant.isDeclared).toBeFalse();
    const declaration = constant.declare();
    expect(declaration.decl).toBe(
      '#define constant NEG1 = 0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff'
    );
    expect(declaration.type).toBe('constant');
    expect(declaration.name).toBe('NEG1');
    expect(constant.isDeclared).toBeTrue();

    expect(constant.define()).toBe('[NEG1]');
  });

  it('free storage pointer', () => {
    const constant = new FreeStoragePointer('SLOT');

    expect(constant.isDeclared).toBeFalse();
    const declaration = constant.declare();
    expect(declaration.decl).toBe('#define constant SLOT = FREE_STORAGE_POINTER()');
    expect(declaration.type).toBe('constant');
    expect(declaration.name).toBe('SLOT');
    expect(constant.isDeclared).toBeTrue();

    expect(constant.define()).toBe('[SLOT]');
  });
});

describe('error', () => {
  it('no arguments', () => {
    const error = new ErrorABI('NoArg');

    expect(error.isDeclared).toBeFalse();
    const declaration = error.declare();
    expect(declaration.decl).toBe('#define error NoArg()');
    expect(declaration.type).toBe('error');
    expect(declaration.name).toBe('NoArg');
    expect(error.isDeclared).toBeTrue();

    expect(error.define()).toBe('__ERROR(NoArg)');
  });

  it('arguments', () => {
    // https://github.com/huff-language/huffmate/blob/main/src/tokens/ERC20.huff
    const error = new ErrorABI('Arg', ['uint256', 'int120']);

    expect(error.isDeclared).toBeFalse();
    const declaration = error.declare();
    expect(declaration.decl).toBe('#define error Arg(uint256, int120)');
    expect(declaration.type).toBe('error');
    expect(declaration.name).toBe('Arg');
    expect(error.isDeclared).toBeTrue();

    expect(error.define()).toBe('__ERROR(Arg)');
  });
});

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

describe('function', () => {
  it('arguments', () => {
    const func = new FunctionABI('args', {args: ['address'], type: 'nonpayable'});
    expect(func.isDeclared).toBeFalse();
    expect(func.declare().decl).toBe('#define function args(address) nonpayable returns ()');
    expect(func.isDeclared).toBeTrue();
    expect(func.define()).toBe('__FUNC_SIG(args)');
  });

  it('returns', () => {
    // https://github.com/huff-language/huffmate/blob/main/src/math/Math.huff
    const func = new FunctionABI('doesreturn', {args: ['uint256', 'uint256'], type: 'pure', returns: ['uint256']});
    expect(func.isDeclared).toBeFalse();
    expect(func.declare().decl).toBe('#define function doesreturn(uint256, uint256) pure returns (uint256)');
    expect(func.isDeclared).toBeTrue();
    expect(func.define()).toBe('__FUNC_SIG(doesreturn)');
  });

  it('no type', () => {
    // https://github.com/huff-language/huffmate/blob/main/src/math/Math.huff
    const func = new FunctionABI('notype', {args: ['uint16'], returns: ['uint32']});
    expect(func.isDeclared).toBeFalse();
    expect(func.declare().decl).toBe('#define function notype(uint16) returns (uint32)');
    expect(func.isDeclared).toBeTrue();
    expect(func.define()).toBe('__FUNC_SIG(notype)');
  });
});

describe('tables', () => {
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

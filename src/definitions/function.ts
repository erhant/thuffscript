import {getDeclaration, getPush, getSignature} from './symbols';
import {Primitive} from '../types';

/** A function interface. */
export class Function {
  /** Function name. */
  readonly name: string;
  /** Function argument types. */
  readonly args: Primitive[];
  /** Function type. */
  readonly type: 'view' | 'payable' | 'pure' | 'nonpayable' | null; // TODO
  /** Function return types. */
  readonly returns: Primitive[];

  constructor(
    name: string,
    params: {
      args?: Primitive[];
      returns?: Primitive[];
      type?: 'view' | 'payable' | 'pure' | 'nonpayable';
    }
  ) {
    this.name = name;
    this.args = params.args || [];
    this.type = params.type || null;
    this.returns = params.returns || [];
  }

  [getDeclaration](): string {
    return `#define function ${this.name}(${this.args.join(', ')}) ${
      this.type ? this.type + ' ' : ''
    }returns(${this.returns.join(', ')})`;
  }

  [getPush](): string {
    return `__FUNC_SIG(${this.name})`;
  }
}

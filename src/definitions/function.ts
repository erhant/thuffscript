import {declare, define} from './symbols';
import {Primitive} from '../types';
import {Huffable} from '../types/huffable';

/** A function interface. */
export class Function implements Huffable {
  readonly name: string;
  readonly args: Primitive[];
  readonly returns: Primitive[];
  readonly type: 'view' | 'payable' | 'pure' | 'nonpayable' | null;
  isDeclared = false;

  constructor(
    name: string,
    params: {
      args?: Primitive[];
      returns?: Primitive[];
      type?: 'view' | 'payable' | 'pure' | 'nonpayable';
    } = {}
  ) {
    this.name = name;
    this.args = params.args || [];
    this.type = params.type || null;
    this.returns = params.returns || [];
  }

  [declare](): string {
    this.isDeclared = true;
    return `#define function ${this.name}(${this.args.join(', ')}) ${
      this.type ? this.type + ' ' : ''
    }returns(${this.returns.join(', ')})`;
  }

  [define](): string {
    return `__FUNC_SIG(${this.name})`;
  }
}

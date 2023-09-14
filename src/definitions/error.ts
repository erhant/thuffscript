import {Primitive} from '../types';
import {Huffable} from '../types/huffable';
import {declare, parse} from './symbols';

export class Error implements Huffable {
  /** Custom error name. */
  readonly name: string;
  /** Error arguments. */
  readonly args: Primitive[];

  constructor(name: string, args: Primitive[] = []) {
    this.name = name;
    this.args = args;
  }

  [declare](): string {
    return `#define error ${this.name}(${this.args.join(', ')})`;
  }

  [parse](): string {
    return `_ERROR(${this.name})`;
  }
}

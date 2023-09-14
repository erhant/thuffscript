import {Primitive} from '../types';
import {Huffable} from '../types/huffable';
import {declare, define} from './symbols';

export class CustomError implements Huffable {
  readonly name: string;
  readonly args: Primitive[];
  isDeclared = false;

  constructor(name: string, args: Primitive[] = []) {
    this.name = name;
    this.args = args;
  }

  [declare](): string {
    this.isDeclared = true;
    return `#define error ${this.name}(${this.args.join(', ')})`;
  }

  [define](): string {
    return `_ERROR(${this.name})`;
  }
}

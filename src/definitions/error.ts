import {declare, define} from './symbols';
import type {Huffable, Primitive} from '../types';

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
    return `__ERROR(${this.name})`;
  }
}

import {declare, parse} from './symbols';
import {Literal} from '../types';
import {Huffable} from '../types/huffable';

export class Constant implements Huffable {
  /** Custom error name. */
  readonly name: string;
  /** Value of this constant. */
  readonly value: Literal;

  constructor(name: string, value: Literal) {
    this.name = name;
    this.value = value;
  }

  [declare]() {
    return `#define constant ${this.name} = ${this.value}`;
  }

  [parse]() {
    return `[${this.name}]`;
  }
}

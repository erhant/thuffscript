import {declare, define} from './symbols';
import {Literal} from '../types';
import {Huffable} from '../types/huffable';

export class Constant implements Huffable {
  readonly name: string;
  readonly value: Literal;
  isDeclared = false;

  constructor(name: string, value: Literal) {
    this.name = name;
    this.value = value;
  }

  [declare]() {
    this.isDeclared = true;
    return `#define constant ${this.name} = ${this.value}`;
  }

  [define]() {
    return `[${this.name}]`;
  }
}

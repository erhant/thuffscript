import {declare, define} from './symbols';
import type {Huffable, Literal} from '../types';

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
    return `#define constant ${this.name} = 0x${this.value.toString(16)}`;
  }

  [define]() {
    return `[${this.name}]`;
  }
}

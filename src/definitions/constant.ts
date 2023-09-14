import {declare, define} from './symbols';
import type {Huffable, Literal} from '../types';

// TODO alternative api: leave value empty to be free storage pointer
// TODO smol optimizations possible here

export class Constant implements Huffable {
  readonly name: string;
  readonly value: Literal | 'FREE_STORAGE_POINTER()';
  isDeclared = false;

  constructor(name: string, value?: Literal | 'FREE_STORAGE_POINTER()') {
    this.name = name;
    this.value = value || 'FREE_STORAGE_POINTER()';
  }

  [declare]() {
    this.isDeclared = true;
    return `#define constant ${this.name} = ${typeof this.value !== 'string' ? '0x' : ''}${this.value.toString(16)}`;
  }

  [define]() {
    return `[${this.name}]`;
  }
}

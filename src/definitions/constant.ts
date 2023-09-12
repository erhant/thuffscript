import {getDeclaration, getPush} from './symbols';
import {Literal} from '../types';

export class Constant {
  /** Custom error name. */
  readonly name: string;
  /** Value of this constant. */
  readonly value: Literal;

  constructor(name: string, value: Literal) {
    this.name = name;
    this.value = value;
  }

  [getDeclaration](): string {
    return `#define constant ${this.name} = ${this.value}`;
  }

  [getPush](): string {
    return `[${this.name}]`;
  }
}

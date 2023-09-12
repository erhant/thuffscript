import {getDeclaration, getPush, getSignature} from './symbols';

export class Error {
  /** Custom error name. */
  readonly name: string;

  constructor(name: string /* TODO: types */) {
    this.name = name;
  }

  [getDeclaration](): string {
    return `#define error ${this.name}(TODO TODO)`;
  }

  [getPush](): string {
    return `_ERROR(${this.name})`;
  }
}

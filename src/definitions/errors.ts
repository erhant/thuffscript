import {getDeclaration, getSignature} from '.';

class CustomError {
  /** Custom error name. */
  readonly name: string;

  constructor(name: string /* TODO: types */) {
    this.name = name;
  }

  [getDeclaration](): string {
    return `#define error ${this.name}(TODO TODO)`;
  }

  [getSignature](): string {
    return `_ERROR(${this.name})`;
  }
}

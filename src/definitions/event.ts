import {getDeclaration, getPush, getSignature} from './symbols';
import {Primitive} from '../types';

/** An event interface. */
export class Event {
  /** Event name. */
  readonly name: string;
  /** Event topic types. */
  readonly topics: (Primitive | `${Primitive} indexed`)[];

  constructor(name: string, topics: (Primitive | `${Primitive} indexed`)[] = []) {
    this.name = name;
    this.topics = topics;
  }

  [getDeclaration](): string {
    return `#define event ${this.name}(${this.topics
      .map(t => (typeof t === 'string' ? t : t[0] + ' indexed'))
      .join(', ')})`;
  }

  [getPush](): string {
    return `__EVENT_HASH(${this.name})`;
  }
}

import {Huffable, Primitive} from '../types';
import {declare, define} from './symbols';

/** An event interface. */
export class Event implements Huffable {
  readonly name: string;
  readonly topics: (Primitive | `${Primitive} indexed`)[];
  isDeclared = false;

  constructor(name: string, topics: (Primitive | `${Primitive} indexed`)[] = []) {
    this.name = name;
    this.topics = topics;
  }

  [declare](): string {
    return `#define event ${this.name}(${this.topics.join(', ')})`;
  }

  [define](): string {
    return `__EVENT_HASH(${this.name})`;
  }
}

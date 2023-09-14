import {declare, parse} from './symbols';
import {Primitive} from '../types';
import {Huffable} from '../types/huffable';

/** An event interface. */
export class Event implements Huffable {
  /** Event name. */
  readonly name: string;
  /** Event topic types. */
  readonly topics: (Primitive | `${Primitive} indexed`)[];

  constructor(name: string, topics: (Primitive | `${Primitive} indexed`)[] = []) {
    this.name = name;
    this.topics = topics;
  }

  [declare](): string {
    return `#define event ${this.name}(${this.topics.join(', ')})`;
  }

  [parse](): string {
    return `__EVENT_HASH(${this.name})`;
  }
}

import {declare, define} from './symbols';
import type {Huffable, Primitive} from '../types';

type IndexablePrimitive = Primitive | `${Primitive} indexed`;

/** An event interface. */
export class Event implements Huffable {
  readonly name: string;
  readonly topics: (Primitive | `${Primitive} indexed`)[];
  isDeclared = false;

  constructor(name: string, topics: IndexablePrimitive[] = []) {
    this.name = name;
    this.topics = topics;
  }

  [declare](): string {
    this.isDeclared = true;
    return `#define event ${this.name}(${this.topics.join(', ')})`;
  }

  [define](): string {
    return `__EVENT_HASH(${this.name})`;
  }
}

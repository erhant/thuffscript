import {Declarable, Primitive} from '../types';

type IndexablePrimitive = Primitive | `${Primitive} indexed`;

/** An event interface. */
export class Event extends Declarable {
  readonly topics: (Primitive | `${Primitive} indexed`)[];

  constructor(name: string, topics: IndexablePrimitive[] = []) {
    super(name, 'event');
    this.topics = topics;
  }

  declare() {
    return super.declare(`#define event ${this.name}(${this.topics.join(', ')})`);
  }

  define() {
    return `__EVENT_HASH(${this.name})`;
  }
}

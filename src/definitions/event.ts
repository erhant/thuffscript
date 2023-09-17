import {Declarable} from '../common';
import {Primitive} from '../types';

/** An event interface. */
export class EventABI extends Declarable {
  constructor(
    name: string,
    readonly topics: (Primitive | `${Primitive} indexed`)[] = []
  ) {
    super(name, 'event');
  }

  declare() {
    return super.declare(`#define event ${this.name}(${this.topics.join(', ')})`);
  }

  define() {
    return `__EVENT_HASH(${this.name})`;
  }
}

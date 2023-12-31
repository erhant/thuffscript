import {Declarable} from '../declarables/declarable';
import type {Primitive} from '../types';

/** An [event interface](https://docs.huff.sh/get-started/huff-by-example/#defining-your-interface).
 *
 * @param name name of the event interface
 * @param args (optional) event parameters, accepts `indexed` parameters as well
 */
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

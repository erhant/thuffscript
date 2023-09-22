import {Declarable} from '../declarables/declarable';
import {Primitive} from '../types';

/** A custom error interface. */
export class ErrorABI extends Declarable {
  readonly args: Primitive[];

  constructor(name: string, args: Primitive[] = []) {
    super(name, 'error');
    this.args = args;
  }

  declare() {
    return super.declare(`#define error ${this.name}(${this.args.join(', ')})`);
  }

  define() {
    return `__ERROR(${this.name})`;
  }
}

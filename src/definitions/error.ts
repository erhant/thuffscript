import {Declarable, Primitive} from '../types';

export class CustomError extends Declarable {
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

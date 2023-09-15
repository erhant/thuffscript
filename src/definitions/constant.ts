import {Declarable, Literal} from '../types';

// TODO alternative api: leave value empty to be free storage pointer
// TODO smol optimizations possible here

export class Constant extends Declarable {
  readonly value: Literal | 'FREE_STORAGE_POINTER()';

  /** If you do not provide a value, this acts like a `FREE_STORAGE_POINTER()`.  */
  constructor(name: string, value?: Literal | 'FREE_STORAGE_POINTER()') {
    super(name, 'constant');
    this.value = value || 'FREE_STORAGE_POINTER()';
  }

  declare() {
    return super.declare(
      `#define constant ${this.name} = ${typeof this.value !== 'string' ? '0x' : ''}${this.value.toString(16)}`
    );
  }

  define() {
    return `[${this.name}]`;
  }
}

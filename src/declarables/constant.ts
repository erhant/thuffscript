import {Declarable} from '../declarables/declarable';
import type {Literal} from '../types';

/** A [constant](https://docs.huff.sh/get-started/huff-by-example/#constants).
 *
 * If you are looking for the `FREE_STORAGE_POINTER()` constant, refer to `FreeStoragePointer`.
 *
 * @param name name of the constant
 * @param value a literal
 */
export class Constant extends Declarable {
  readonly value: Literal;

  constructor(name: string, value: Literal) {
    super(name, 'constant');
    this.value = value;
  }

  declare() {
    return super.declare(`#define constant ${this.name} = 0x${this.value.toString(16)}`);
  }

  define() {
    return `[${this.name}]`;
  }
}

/** The `FREE_STORAGE_POINTER()` [constant](https://docs.huff.sh/get-started/huff-by-example/#constants). */
export class FreeStoragePointer extends Declarable {
  constructor(name: string) {
    super(name, 'constant');
  }

  declare() {
    return super.declare(`#define constant ${this.name} = FREE_STORAGE_POINTER()`);
  }

  define() {
    return `[${this.name}]`;
  }
}

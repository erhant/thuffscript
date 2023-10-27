import type {Declaration} from '.';

/** A declarable is something that you declare at some point in your Huff code,
 * and then you can refer to it afterwards. It does not include any instructions within.
 */
export abstract class Declarable {
  /** Name of the object. */
  name: string;
  /** Type of this declarable. */
  readonly type: Declaration['type'];
  /** Is this object already declared? */
  isDeclared: boolean = false;

  constructor(name: string, type: Declaration['type']) {
    if (name === '') {
      throw new Error('name cant be empty');
    }
    this.name = name;
    this.type = type;
  }

  /** Object definition. */
  abstract define(): string;

  /** Object declaration.
   *
   * Takes in the code, and returns a `Declaration` which attaches the type
   * of this construct along with its name to the given code.
   *
   * It also checks if this construct has been declared before, which is not
   * expected to happen if we are calling this function.
   */
  declare(code: string): Declaration {
    if (this.isDeclared) {
      throw new Error('already declared');
    }
    this.isDeclared = true;
    return {
      type: this.type,
      decl: code,
      name: this.name,
    };
  }
}

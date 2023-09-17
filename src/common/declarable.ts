import {Constant, ErrorABI, EventABI, FunctionABI} from '..';
import {FreeStoragePointer, Table} from '../definitions';

export type Declaration = {
  type: 'function' | 'constant' | 'error' | 'event' | 'table';
  decl: string;
  name: string;
};

export type Declarables = FunctionABI | Constant | FreeStoragePointer | ErrorABI | EventABI | Table;

export abstract class Declarable {
  /** Name of the object. */
  name: string;
  /** Type of this declarable. */
  readonly type: Declaration['type'];
  /** Is this object already declared? */
  isDeclared: boolean = false;

  constructor(name: string, type: Declaration['type']) {
    this.name = name;
    this.type = type;
  }

  /** Object definition */
  abstract define(): string;

  /** Object declaration */
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

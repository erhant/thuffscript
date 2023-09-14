import type {declare, define} from '../definitions/symbols';

export interface Huffable {
  /** Name of the object. */
  name: string;

  /** Is this object already declared? */
  isDeclared: boolean;

  /** Object declaration */
  [declare](): string;

  /** Object definition */
  [define](): string;
}

import {declare, parse} from '../definitions/symbols';

export interface Huffable {
  [declare](): string;
  [parse](): string;
}

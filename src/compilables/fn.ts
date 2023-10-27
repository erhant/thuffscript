import {Macro} from '.';

/** A [function](https://docs.huff.sh/get-started/huff-by-example/#functions). */
export class Fn<A extends string = string> extends Macro<A> {
  constructor(name: string, params: {args?: A[]; takes?: number; returns?: number} = {}) {
    super(name, params);
    this.type = 'fn';
  }
}

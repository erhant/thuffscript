import {Macro} from '.';

/** A `fn`. */
export class Fn<A extends string = string> extends Macro<A> {
  constructor(name: string, params: {args?: A[]; takes?: number; returns?: number} = {}) {
    super(name, params);
    this.type = 'fn';
  }
}

import {Macro} from '.';

/** A [function](https://docs.huff.sh/get-started/huff-by-example/#functions).
 *
 * - To get the function size, use: `fn.size`
 * - To call a function, use: `fn.call()`
 *
 * When you are defining a function, use the following format:
 *
 * ```ts
 * const foo = new Fn('foo').body(
 *    // instructions
 * )
 * ```
 *
 * @param name name of the macro
 * @param args (optional) array of argument names; if provided, TypeScript will auto-complete
 * arguments as `<arg-name>` within the `body` function
 * @param takes (optional) number of stack items taken by this macro
 * @param returns (optional) number of stack items returned by this macro
 */
export class Fn<A extends string = string> extends Macro<A> {
  constructor(name: string, params: {args?: A[]; takes?: number; returns?: number} = {}) {
    super(name, params);
    this.type = 'fn';
  }
}

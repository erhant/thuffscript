import {Compilable} from './compilable';
import type {Literal} from '../types';

/** A [test](https://docs.huff.sh/get-started/huff-by-example/#huff-tests).
 *
 * @param name name of the test
 * @param decorators `calldata` and `value` for this test
 */
export class Test extends Compilable {
  constructor(
    name: string,
    readonly decorators: {[decorator in 'calldata' | 'value']?: Literal} = {}
  ) {
    super(name);
  }

  compile() {
    const {calldata, value} = this.decorators;
    const decoratorDefinitions = [
      calldata ? `calldata("0x${calldata.toString(16)}")` : null,
      value ? `value(0x${value.toString(16)})` : null,
    ].filter(d => d !== null) as string[];
    const decoratorString = decoratorDefinitions.length > 0 ? `#[${decoratorDefinitions.join(', ')}]\n` : '';

    const comp = super.compile();
    return {
      body: `${decoratorString}#define test ${this.name}() = {
    ${comp.body}
}`,
      declarables: comp.declarables,
      macros: comp.macros,
    };
  }
}

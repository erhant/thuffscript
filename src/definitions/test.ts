import {Macro} from '.';
import {Body} from '../common/body';
import {Statement, Literal, Declarables} from '../types';

/**
 * A Huff test.
 */
export class Test extends Body {
  constructor(
    name: string,
    readonly decorators: {[decorator in 'calldata' | 'value']?: Literal | null} = {}
  ) {
    super(name);
  }

  body(...ops: (Statement<string>[] | Statement<string>)[]) {
    this.ops = ops;
    return this;
  }

  compile(): {
    body: string;
    declarables: Declarables[];
    macros: Macro[];
  } {
    const comp = super.compile();
    const decorators = [
      this.decorators.calldata ? `calldata("0x${this.decorators.calldata.toString(16)}")` : null,
      this.decorators.value ? `value(0x${this.decorators.value.toString(16)})` : null,
    ].filter(d => d !== null) as string[];
    const decoratorString = decorators.length > 0 ? `#[${decorators.join(', ')}]\n    ` : '';
    return {
      body: `${decoratorString}#define test ${this.name}() = {
    ${comp.body}
}`,
      declarables: comp.declarables,
      macros: comp.macros,
    };
  }
}

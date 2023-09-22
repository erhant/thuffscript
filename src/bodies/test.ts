import {Body} from './base';
import {Literal} from '../types';

/** A test. */
export class Test extends Body {
  constructor(
    name: string,
    readonly decorators: {[decorator in 'calldata' | 'value']?: Literal} = {}
  ) {
    super(name);
  }

  compile() {
    const decoratorDefinitions = [
      this.decorators.calldata ? `calldata("0x${this.decorators.calldata.toString(16)}")` : null,
      this.decorators.value ? `value(0x${this.decorators.value.toString(16)})` : null,
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

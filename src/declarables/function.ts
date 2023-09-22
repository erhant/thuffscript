import {Declarable} from '../declarables/declarable';
import {Primitive} from '../types';
import {Label} from '..';

/** A function interface. */
export class FunctionABI extends Declarable {
  readonly args: Primitive[];
  readonly returns: Primitive[];
  readonly functype: 'view' | 'payable' | 'pure' | 'nonpayable' | null;
  /** A label with the name of this function, for utility purposes. */
  readonly label: Label;

  constructor(
    name: string,
    params: {
      args?: Primitive[];
      returns?: Primitive[];
      type?: 'view' | 'payable' | 'pure' | 'nonpayable';
    } = {}
  ) {
    super(name, 'function');
    this.args = params.args || [];
    this.functype = params.type || null;
    this.returns = params.returns || [];
    this.label = new Label(name + '_func');
  }

  declare() {
    return super.declare(
      `#define function ${this.name}(${this.args.join(', ')}) ${
        this.functype ? this.functype + ' ' : ''
      }returns (${this.returns.join(', ')})`
    );
  }

  define() {
    return `__FUNC_SIG(${this.name})`;
  }
}

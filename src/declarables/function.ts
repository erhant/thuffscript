import {Declarable} from '../declarables/declarable';
import {Primitive} from '../types';
import {Label} from '..';

/** A [function interface](https://docs.huff.sh/get-started/huff-by-example/#defining-your-interface).
 *
 * @param name name of the function interface
 * @param args (optional) function parameters
 * @param returns (optional) returned values
 * @param type (optional) function type, defaults to `nonpayable`
 */
export class FunctionABI extends Declarable {
  readonly args: Primitive[];
  readonly returns: Primitive[];
  readonly functype: 'view' | 'payable' | 'pure' | 'nonpayable';

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
    this.functype = params.type || 'nonpayable';
    this.returns = params.returns || [];
  }

  /**
   * A shorthand to get a label for this function.
   * Adds `_func` to the function name for the label.
   */
  get label() {
    return new Label(this.name + '_func');
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

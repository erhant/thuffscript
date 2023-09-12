import {getDeclaration, getSignature} from '.';

/** A function interface. */
export class Function {
  /** Function name. */
  readonly name: string;
  /** Function argument types. */
  readonly args: string[]; // TODO
  /** Function type. */
  readonly type: string | null; // TODO
  /** Function return types. */
  readonly returns: string[];

  constructor(ops: {name: string; args?: string[]; type?: string; returns?: string[]}) {
    this.name = ops.name;
    this.args = ops.args || [];
    this.type = ops.type || null;
    this.returns = ops.returns || [];
  }

  [getDeclaration](): string {
    let decl = [`#define function ${this.name}(${this.args.join(', ')})`];

    if (this.type) decl.push(this.type);
    if (this.returns.length > 0) decl.push(`(${this.returns.join(', ')})`);

    return decl.join(' ');
  }

  [getSignature](): string {
    return `__FUNC_SIG(${this.name})`;
  }
}

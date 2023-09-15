export abstract class Definable {
  /** Name of the object. */
  name: string;

  constructor(name: string) {
    this.name = name;
  }

  /** Object definition */
  abstract define(): string;
}

export abstract class Declarable extends Definable {
  /** Type of this definable. */
  readonly type: 'constant' | 'error' | 'macro' | 'event' | 'function';
  /** Is this object already declared? */
  isDeclared: boolean = false;

  constructor(name: string, type: 'constant' | 'error' | 'macro' | 'event' | 'function') {
    super(name);
    this.type = type;
  }

  /** Object declaration */
  declare(code: string) {
    if (this.isDeclared) {
      throw new Error('already declared');
    }
    this.isDeclared = true;
    return {
      type: this.type,
      decl: code,
      name: this.name,
    };
  }
}

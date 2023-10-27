import {Declaration} from '.';
import {Declarable} from '../declarables/declarable';
import {Label} from '../labels';
import {Literal} from '../types';

// TODO: does table really extend `Declarable`? Or, is it unique like `jump label`?

export abstract class Table extends Declarable {
  constructor(name: string) {
    super(name, 'table');
  }

  get start() {
    return new TableStart(this);
  }

  get size() {
    return new TableSize(this);
  }

  declare(code: string) {
    return super.declare(code);
  }

  define(): never {
    throw new Error('table has no definition');
  }
}

/** [Start](https://docs.huff.sh/get-started/huff-by-example/#tablestart-table) of the table. */
export class TableStart {
  constructor(readonly table: Table) {}

  define() {
    return `__tablestart(${this.table.name})`;
  }
}

/** [Size](https://docs.huff.sh/get-started/huff-by-example/#tablesize-table) of the table. */
export class TableSize {
  constructor(readonly table: Table) {}

  define() {
    return `__tablesize(${this.table.name})`;
  }
}

/** A [jump table](https://docs.huff.sh/get-started/huff-by-example/#jump-tables). */
export class JumpTable extends Table {
  constructor(
    name: string,
    readonly jumps: Label[]
  ) {
    super(name);
  }

  declare(): Declaration {
    const code = `#define jumptable {
    ${this.jumps.map(jmp => jmp.src.define()).join(' ')}
}`;
    return super.declare(code);
  }
}

/** A packed [jump table](https://docs.huff.sh/get-started/huff-by-example/#jump-tables). */
export class PackedJumpTable extends Table {
  constructor(
    name: string,
    readonly jumps: Label[]
  ) {
    super(name);
  }

  declare(): Declaration {
    const code = `#define jumptable__packed {
    ${this.jumps.map(jmp => jmp.src.define()).join(' ')}
}`;
    return super.declare(code);
  }
}

/** A [code table](https://docs.huff.sh/get-started/huff-by-example/#code-tables). */
export class CodeTable extends Table {
  constructor(
    name: string,
    readonly code: Literal
  ) {
    super(name);
  }

  declare(): Declaration {
    const code = `#define table {
    ${'0x' + BigInt(this.code).toString(16)}
}`;
    return super.declare(code);
  }
}

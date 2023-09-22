import {Declarable} from './';
import {Label} from '../definables';
import {Literal} from '../types';

/** A code / jump table. */
export abstract class Table extends Declarable {
  readonly start: TableStart;
  readonly size: TableSize;

  constructor(
    name: string,
    readonly content:
      | {
          type: 'jump';
          value: Label[];
        }
      | {
          type: 'jump_packed';
          value: Label[];
        }
      | {
          type: 'code';
          value: Literal;
        }
  ) {
    super(name, 'table');
    this.start = new TableStart(this);
    this.size = new TableSize(this);
  }

  declare() {
    let code: string;

    if (this.content.type == 'jump') {
      code = `#define jumptable {
    ${this.content.value.map(v => v.src.define()).join(' ')}
`;
    } else if (this.content.type == 'jump_packed') {
      code = `#define jumptable__packed {
    ${this.content.value.map(v => v.src.define()).join(' ')}
`;
    } else if (this.content.type == 'code') {
      code = `#define table {
    ${this.content.value}
`;
    } else {
      this.content satisfies never;
      throw new Error('invalid content type.');
    }

    return super.declare(code);
  }

  define(): never {
    throw new Error('abstract table has no definition');
  }
}

export class TableStart {
  constructor(readonly table: Table) {}

  define() {
    return `__tablestart(${this.table.name})`;
  }
}

export class TableSize {
  constructor(readonly table: Table) {}

  define() {
    return `__tablesize(${this.table.name})`;
  }
}

export class JumpTable extends Table {
  constructor(name: string, jumps: Label[]) {
    super(name, {
      type: 'jump',
      value: jumps,
    });
  }
}

export class PackedJumpTable extends Table {
  constructor(name: string, jumps: Label[]) {
    super(name, {
      type: 'jump_packed',
      value: jumps,
    });
  }
}

export class CodeTable extends Table {
  constructor(name: string, code: Literal) {
    super(name, {
      type: 'code',
      value: code,
    });
  }
}

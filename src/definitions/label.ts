/**
 * A jump label.
 */
export class Label {
  /** label name. */
  readonly name: string;

  constructor(name: string) {
    this.name = name;
  }

  // these should return JumpSrc and JumpDest types, not assignable to strings
  src(): string {
    return this.name;
  }

  dest(): string {
    return this.name + ': ';
  }
}

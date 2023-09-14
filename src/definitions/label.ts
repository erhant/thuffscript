/**
 * A jump label.
 */
export class Label {
  readonly name: string;
  isDestPlaced = false;

  constructor(name: string) {
    this.name = name;
  }

  src(): string {
    return this.name;
  }

  dest(): string {
    this.isDestPlaced = true;
    return this.name + ':';
  }
}

import {Definable} from '..';

/**
 * A jump label.
 */
export class Label {
  readonly name: string;
  readonly src: Jump;
  readonly dest: Jump;
  destinationPlaced = false;

  constructor(name: string) {
    this.name = name;
    this.src = new Jump(this, false);
    this.dest = new Jump(this, true);
  }
}

export class Jump extends Definable {
  constructor(readonly label: Label, readonly dest: boolean) {
    super(label.name);
  }

  define() {
    if (this.dest) {
      if (this.label.destinationPlaced) {
        throw new Error('label already placed');
      }
      this.label.destinationPlaced = true;
      return `${this.label.name}:`;
    } else {
      return `${this.label.name}`;
    }
  }
}

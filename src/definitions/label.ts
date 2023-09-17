/** A jump label. */
export class Label {
  readonly name: string;
  readonly src: JumpSource;
  readonly dest: JumpDest;
  destinationPlaced = false;

  constructor(name: string) {
    this.name = name;
    this.src = new JumpSource(this);
    this.dest = new JumpDest(this);
  }
}

export class JumpDest {
  constructor(readonly label: Label) {}

  define() {
    if (this.label.destinationPlaced) {
      throw new Error('destination already placed');
    }
    this.label.destinationPlaced = true;
    return `${this.label.name}:`;
  }
}

export class JumpSource {
  constructor(readonly label: Label) {}

  define() {
    return `${this.label.name}`;
  }
}

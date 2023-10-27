/** A [jump label](https://docs.huff.sh/get-started/huff-by-example/#jump-labels). */
export class Label {
  readonly name: string;
  readonly src: JumpSource;
  readonly dest: JumpDest;

  constructor(name: string) {
    if (name === '') {
      throw new Error('label name cant be empty string.');
    }
    this.name = name;
    this.src = new JumpSource(this);
    this.dest = new JumpDest(this);
  }
}

/** A jump destination. */
export class JumpDest {
  constructor(readonly label: Label) {}

  define() {
    return `${this.label.name}:`;
  }
}

/** A jump source. */
export class JumpSource {
  constructor(readonly label: Label) {}

  define() {
    return `${this.label.name}`;
  }
}

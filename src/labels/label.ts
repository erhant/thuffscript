/** A jump label. */
export class Label {
  readonly name: string;
  readonly src: JumpSource;
  readonly dest: JumpDest;

  constructor(name: string) {
    this.name = name;
    this.src = new JumpSource(this);
    this.dest = new JumpDest(this);
  }
}

export class JumpDest {
  constructor(readonly label: Label) {}

  define() {
    return `${this.label.name}:`;
  }
}

export class JumpSource {
  constructor(readonly label: Label) {}

  define() {
    return `${this.label.name}`;
  }
}

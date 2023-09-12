import {getDeclaration, getSignature} from '.';

/** An event interface. */
class Event {
  /** Event name. */
  readonly name: string;
  /** Event topic types. */
  readonly topics: (string | [string, true])[]; // TODO typesafe

  constructor(name: string, topics: (string | [string, true])[] = []) {
    this.name = name;
    this.topics = topics;
  }

  [getDeclaration](): string {
    return `#define event ${this.name}(${this.topics
      .map(t => (typeof t === 'string' ? t : t[0] + ' indexed'))
      .join(', ')})`;
  }

  [getSignature](): string {
    return `__EVENT_HASH(${this.name})`;
  }
}

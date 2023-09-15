import {Declaration} from '.';
import {Constructor, Main, Macro} from './definitions';

export function compile(
  entry: Main | [Main, Constructor],
  fields: {
    /** Author of this contract, usually "name <github-link>" */
    author?: string | string[];
    /** SPDX license of the contract. */
    license?: 'UNLICENSED' | 'MIT' | string;
    /** Title of the contract. */
    title?: string;
    /** A short description of the contract. */
    description?: string;
  } = {}
): string {
  let macros: Macro[] = Array.isArray(entry) ? entry : [entry];

  let declarations: {[x in Declaration['type']]: string[]} = {
    constant: [],
    error: [],
    event: [],
    function: [],
  };
  let bodies: string[] = [];

  // compile all macros
  while (macros.length !== 0) {
    let macro = macros.pop()!;

    let comp = macro.compile();
    bodies.push(comp.body);
    comp.declarables.forEach(d => {
      if (!d.isDeclared) {
        declarations[d.type].push(d.declare().decl);
      }
    });
    macros.push(...comp.macros.filter(m => !m.isCompiled));
  }

  const constants = declarations.constant.length
    ? `
////////////////////////////////////////////////////////////////
//                         CONSTANTS                          //
////////////////////////////////////////////////////////////////
  

${declarations.constant.join('\n')}
`
    : null;

  // errors
  const errors = declarations.error.length
    ? `
////////////////////////////////////////////////////////////////
//                           ERRORS                           //
////////////////////////////////////////////////////////////////
  

${declarations.error.join('\n')}
`
    : null;

  // events
  const events = declarations.event.length
    ? `
////////////////////////////////////////////////////////////////
//                           EVENTS                           //
////////////////////////////////////////////////////////////////


${declarations.event.join('\n')}
`
    : null;

  // functions
  const functions = declarations.function.length
    ? `
////////////////////////////////////////////////////////////////
//                          FUNCTIONS                         //
////////////////////////////////////////////////////////////////


${declarations.function.join('\n')}
`
    : null;

  const macroBodies = `
////////////////////////////////////////////////////////////////
//                            MACROS                          //
////////////////////////////////////////////////////////////////


${bodies.reverse().join('\n\n')}
`;

  return [constants, errors, events, functions, macroBodies].filter(a => a !== null).join('\n');
}

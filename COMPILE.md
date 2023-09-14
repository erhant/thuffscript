# Compilation Process

The entry point is a macro, and when `compile` is called the compiler shall return two things:

- An object of declarations, such as `{fooEvent: '<event declaration>'}`
- A 2D array of definitions, all casted to strings; the first dimension shall be joined by `    \n` and the next dimension joined by a single space.

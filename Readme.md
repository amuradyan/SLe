# An exercise in programming language implementation

This repository accompanies a course on implementing a programming language from scratch. The goal is not just to get to know how languages work, but to build a simple model step by step—and use it to generate music.

We use JavaScript (with Deno) for implementation and Racket for a brief conceptual introduction to Lisp. Along the way, we’ll build tooling, write interpreters, and produce sound.

You might find fleeting notes here and there, usually as markdown files.

## Course structure

Each part is introduced incrementally, allowing room to test, break, and extend the system as understanding grows.

## Repo structure

### Training ground

- `ts/` - JavaScript exercises designed to get comfortable with the tools and patterns we’ll rely on later—particularly array manipulation, function application, and recursion.

- `racket/` - A short detour into Lisp using Racket. Helps build intuition around the syntax and semantics of the language we’ll be implementing.

### [Shvi](./shvi/)

Shvi is the tool, that we'll be building throughout the course. It is a lisp-like language for generating sound.

- [`shvi/fixtures/`](./shvi/fixtures/) - Test cases and examples used throughout the course. These serve as checkpoints and inspiration for expanding the language.

------

The course is inspired by [The Little Schemer](https://mitpress.mit.edu/9780262560997/the-little-schemer/) and [Crafting Interpreters](https://craftinginterpreters.com/). The goal is to build a simple model step by step—and use it to generate music.

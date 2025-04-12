# An exercise in programming language implementation

This repository accompanies a course on implementing a programming language from scratch. The goal is not just to get to know how languages work, but to build a simple model step by step—and use it to generate music.

We use JavaScript (with Deno) for implementation and Racket for a brief conceptual introduction to Lisp. Along the way, we’ll build tooling, write interpreters, and produce sound.

You might find fleeting notes here and there, usually as markdown files.

## Course structure

Each part is introduced incrementally, allowing room to test, break, and extend the system as understanding grows.

## Repo structure

- `ts/` - JavaScript exercises designed to get comfortable with the tools and patterns we’ll rely on later—particularly array manipulation, function application, and recursion.

- `racket/` - A short detour into Lisp using Racket. Helps build intuition around symbolic expressions, evaluation, and code as data.

- `fixtures/` - Test cases and examples used throughout the course. These serve as checkpoints and inspiration for expanding the language.

- [`shvi/`](./shvi/) - Shvi is the tool, that we'll construct throughout the course. It is a lisp-like language for generating sound.

# Shvi 🪈

This repository accompanies a course on implementing a programming language from scratch. The goal is not just to get to know how languages work, but to build a simple model step by step—and use it to generate music.

We use JavaScript (with Deno) for implementation and Racket for a brief conceptual introduction to Lisp. Along the way, we’ll build tooling, write interpreters, and produce sound.

You might find fleeting notes here and there, usually as markdown files.

**NOTE:** Add instructions on how to use the repo /clone, move from branch to branch/ and how to run the code. How to use the walkthrough?

<details>

<summary> Details on Shvi </summary>

Shvi is the tool, that we'll be building throughout the course. It is a lisp-like language for generating sound.

- [`shvi/fixtures/`](./shvi/fixtures/) - Test cases and examples used throughout the course. These serve as checkpoints and inspiration for expanding the language.

------

The course is inspired by [The Little Schemer](https://mitpress.mit.edu/9780262560997/the-little-schemer/) and [Crafting Interpreters](https://craftinginterpreters.com/). The goal is to build a simple model step by step—and use it to generate music.

Shvi is a tool to write music. The notation is inspired by Lisp, and the language is designed to be simple and extensible.

Below is the epic beat from [Still D.R.E.](fixtures/still-dre.shvi) by Dr. Dre and Snoop Dogg played three times

```lisp
(define first-phrase
  (sequence
    (tone C4 80) (tone E4 130) (tone A4 360)))

(define second-phrase
  (sequence
    (tone B3 80) (tone E4 130) (tone A4 360)))

(define third-phrase
  (sequence
    (tone B3 80) (tone E4 130) (tone G4 360)))

(define the-beat
  (sequence
      (repeat 8 first-phrase)
      (repeat 3 second-phrase)
      (repeat 5 third-phrase)))

(define thrice 3)

(repeat thrice the-beat)
```

and the "da da da DUMMMM" from [Beethovens' 5th](fixtures/beethovens-5th.shvi)

```lisp
(sequence
    (silence 1000)

    (parallel (tone G3 300) (tone Eb3 300))   ; da
    (parallel (tone G3 300) (tone Eb3 300))   ; da
    (parallel (tone G3 300) (tone Eb3 300))   ; da
    (parallel (tone Eb3 2000) (tone G2 2000)) ; DUMMM

    (silence 600)

    (parallel (tone F3 300) (tone B2 300))    ; da
    (parallel (tone F3 300) (tone B2 300))    ; da
    (parallel (tone F3 300) (tone B2 300))    ; da
    (parallel (tone D3 2000) (tone G2 2000))) ; DUMMM
```

Shvi defines sounds as a combination of a pitch and duration with `tone` and combines the sounds with `sequence` and `parallel`.

## Using Shvi

To use it, you can pass it a `*.shvi` file and it will generate an `output.wav` file with the sound and play it.

```bash
./shvi.sh fixtures/still-dre.shvi
```

You can also pass it the output file like this:

```bash
./shvi.sh fixtures/still-dre.shvi still-dre.wav
```

**NOTE:** Currently, the script assumes you have `aplay` installed. If you don't, either install it or change the [script](./shvi) to use a different player.

## Structure

It consists of the following components:

- Tokenizer – breaks input strings into [s-expression](https://en.wikipedia.org/wiki/S-expression) tokens
- Evaluator – recursively processes expressions
- Environment – manages bindings, holds the prelude
- Sintez – a JavaScript engine responsible for generating sound waves and writing audio files

</details>

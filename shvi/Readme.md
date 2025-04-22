# Shvi 🪈

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

* Tokenizer – breaks input strings into [s-expression](https://en.wikipedia.org/wiki/S-expression) tokens
* Evaluator – recursively processes expressions
* Environment – manages bindings, holds the prelude
* Sintez – a JavaScript engine responsible for generating sound waves and writing audio files

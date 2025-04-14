# Shvi 🪈

Shvi is a tool to write music. The notation is inspired by Lisp, and the language is designed to be simple and extensible.

Below is the [passage from _Still Dre_](fixtures/still-dre.shvi)

```lisp
(sequence
  (silence 1000)
  (tone C4 70) (tone E4 100) (tone A4 360)
  (silence 90)
  (tone C4 70) (tone E4 100) (tone A4 360)
  (silence 90)
  (tone C4 70) (tone E4 100) (tone A4 360)
  (silence 90)
  (tone C4 70) (tone E4 100) (tone A4 360)
  (silence 90)
  (tone C4 70) (tone E4 100) (tone A4 360)
  (silence 90)
  (tone C4 70) (tone E4 100) (tone A4 360)
  (silence 90)
  (tone C4 70) (tone E4 100) (tone A4 360)
  (silence 90)
  (tone C4 70) (tone E4 100) (tone A4 360)
  (silence 90))
```
and the "da da da DUMMMM" from [Beethovens' 5th](fixtures/beethovens-5th.shvi)

```lisp
(sequence
    (silence 1000)
    (parallel (tone G3 300) (tone Eb3 300))
    (parallel (tone G3 300) (tone Eb3 300))
    (parallel (tone G3 300) (tone Eb3 300))
    (parallel (tone Eb3 2000) (tone G2 2000))
    (silence 600)
    (parallel (tone F3 300) (tone B2 300))
    (parallel (tone F3 300) (tone B2 300))
    (parallel (tone F3 300) (tone B2 300))
    (parallel (tone D3 2000) (tone G2 2000)))
```

Shvi defines sounds as a combination of a pitch and duration with `tone` and combines the sounds with `sequence` and `parallel`.

## Using Shvi

To use it, you can pass it a `*.shvi` file and it will generate a `.wav` file with the sound and play it

```bash
./shvi.sh fixtures/still-dre.shvi
```

 or pass it an output file and it will generate a the wave file.

```bash
./shvi.sh fixtures/still-dre.shvi still-dre.wav
```

**NOTE:** Currently, the script assumes you have `aplay` installed. If you don't, either install it or change the [script](./shvi) to use a different player.

## Structure

It consists of the following components:

* Tokenizer – breaks input strings into s-expression tokens
* Evaluator – recursively processes expressions
* Environment – manages bindings and lexical scopes
* Sintez – a JavaScript engine responsible for generating sound waves and writing audio files

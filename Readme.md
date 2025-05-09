# Shvi 🪈

This repository accompanies a course on implementing a programming language from scratch. The idea is to explore how programming languages work by building a simple language to write music step by step.

For the looks and the mechanics of our language, we'll draw inspiration from an old and powerful family of programming languages - the LISPs, and we'll use JS to actually build and use the tool. We won't get into details with any of these languages, and, I hope, you'll be surprised to learn how far one can go in their experiments relying on a few fundamental ideas.

## Course structure

Starting from a single note, we'll then explore the ways of combining them, changing our system piece by piece, to be able to write more complex pieces. From there we shall look into the repetitive nature of music and the ability to name certain passages in a piece. At the moment this is as we have gone with the course, but more steps might be added in the future.

In this repo we'll build a tool to write and play music step by step. Each step of the exercise is a git branch that provides the key tests to that step and the code scaffolding that should be implemented. Once the tests pass, you can move to the next branch and so on. The branch names start with the two-digit step index, followed by the functionality description, e.g. `00-getting-started`, `01-making-a-sound`, etc.

You can hop to the [first step](./00-getting-started.md) and start the journey right away.

## What is Shvi?

Shvi is the tool, that we'll be working on through the course. It is a lisp-like language for writing music. Below is the epic intro from Beethoven's 5th symphony in it:

```lisp
(sequence
    (parallel (tone G3 300) (tone Eb3 300))    ; da
    (parallel (tone G3 300) (tone Eb3 300))    ; da
    (parallel (tone G3 300) (tone Eb3 300))    ; da
    (parallel (tone Eb3 1500) (tone G2 1500))) ; DUMMMM
```

To describe a sound, Shvi provides the `tone` function, which takes a pitch and a duration. Certain pitches have names and are known to Shvi, so we can use them directly, e.g. `C4`, `E4`, `A4`, etc. The `parallel` combines multiple sounds into one, and `sequence` puts them one after another. The `;` character is used to add comments.

To use it, you can pass it a `*.shvi` file and it will generate an `output.wav` file with the sound and play it.

```bash
./shvi.sh fixtures/still-dre.shvi
```

You can also pass it the output file like this:

```bash
./shvi.sh fixtures/still-dre.shvi still-dre.wav
```

Shvi can do a few more things, and you'll learn about them by implementing them during the course.

**NOTE:** Currently, the script assumes you have `aplay` installed, if you're on Linux. If you don't, either install it or change the [script](./shvi) to use a different player. On MacOS it uses `afplay`, and on Windows it relies on `powershell`.

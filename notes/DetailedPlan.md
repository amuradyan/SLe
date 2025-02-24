# Detailed Plan

## Day 1

Introduction to JS: setup, tools /deno, VS Code, git, and GitHub/, exercises with a test-first approach to form a basic understanding of arrays, enums, files, functions /anonymous ones as well/, and recursion.

* Initialize a git repo locally with `git init`
* Fire up the VS Code, install the [deno](https://docs.deno.com/runtime/reference/vscode/) extension
* Learn about JS `export`, `function`, string-plitting and `Deno.test` and *deno*s `deno test --watch` and `deno run <file>` commands
* Write a couple of recursive functions working with arrays in *head\tail* style to get a feel for the syntax and the process. The exercises would be about tokenizing a string, and storing them in an array. We might go for nested parentheses as well, if time allows.
* Learn about the `Deno.readTextFileSync` and the `--allow-read` flag through a simple exerciseof reading and printing the contents of a file.
* Write a function that reads a file and returns the tokenized contents as an array.

* Register on GitHub, create a repo
* Connect the two together and push the days code to GitHub

        git remote add origin ...
        git push -u origin master

## Day 2

Introduction to LISPs/probably with Racket/: the infix notation and getting used to the syntax, solving simple problems to get the hang of the language, and learning the basic operations /car, cdr, eq?, lambda, cond, define, .../.

* Install Racket /should this be preinstalled?/
* install the [Magic Racket](https://marketplace.visualstudio.com/items?itemName=evzen-wybitul.magic-racket) extension for VS Code
* Learn about the `define` form, write a simple adder and run it from the command line
* Learn about the *rackunit* testing framework and the `provide`, write a simple test for the adder and run it from the command line
* Learn about the `lambda`, `cond`, `eq?`, `null?`, `car`, `cdr`, and `cons` forms, and write a few functions and tests with them
* Push the code to GitHub

## Day 3

Coding the SLIm tokenizer in JS. Reading a file and turning it into an array of tokens. If we are doing well, maybe we'll also introduce and handle multiline strings and comments.

## Day 4

We introduce the notion of evaluation\application, starting with evaluation\application of primitive values /'true', 'false', whole numbers and strings/ and primitive operations /cons, car, cdr, null?, '+', '-', .../. The concrete primitives of SLIm will be decided during the course.

## Day 5

We continue with the evaluation of expressions by introducing the `define` form and the idea of the environment. For simplicity, we resort to a single global environment implemented as a stack data structure.

## Day 6

We move on to introducing evaluating non-primitive forms /'cond', 'lambda', and 'quote'/. These are rather code-heavy days, so we might split them into two days.

## Day 7

I think we'll devote the second ## day to the implementation of the `lambda` form and the idea of closures.

## Day 8

If all goes well, we'll spend the day with a recap of what we did, solve some katas in SLIm, and talk about ideas we were not able to cover during the course. Otherwise, we'll use the day to finish the implementation of the SLIm.
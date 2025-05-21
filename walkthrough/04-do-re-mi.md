# Do, Re, Mi

Congrats! We are able to write and play music... a single tone at least.

```
(tone 293.66 1000)
```

Now it is time to play a melody. To do that, we need to be able to play several tones in a row.

In this exercise, we will introduce the `sequence` command, which will take a list of tones and play them one after the other. The code below will play an F4 for one second, a C4 for two seconds, and a G4 for one second",

```
(sequence (tone 349.23 100) (tone 261.63 200) (tone 392.00 100))
```

To do that, we need to generate the PCM data for each tone and concatenate them together. Just as now the `evaluator` is responsible for evaluating the `tone` command, it will also be responsible for evaluating the `sequence` command.

**Note:** Mind that during concatenation, we'll need to take care of glueing two tones together, so the transition between them is smooth. This means that the end of the first tone should be blended with the beginning of the second tone. To do that, we will need to add a small fade-in and fade-out for each tone when generating the PCM data.

Overall, the exercise contains two steps:

1. Implement the `sequence` command and handle it in the evaluator.
2. Implement the fade-in and fade-out effect in the PCM generator.

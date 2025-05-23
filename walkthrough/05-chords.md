# Chords

Now that we are able to play tones in a row, let's take a step back and think about how we can play several tones at the same time. This is called a chord. In this exercise, we will implement the `parallel` command, which will take a list of frequencies and durations and play them together.

To overlay several tones, we will need to generate the PCM data for each tone and average them together.

```
(parallel (tone 261.63 1000) (tone 329.63 2000))
```

**Note**, that some frequencies may be played for a longer time than others. In that case we will have to fill the missing time with silence. For example, if we play a C4 for 1 second and an E4 for 2 seconds, we will have to overlap the second second of the E4 with silence, not C4.

At the root of the project you'll find the `shvi` runner, that serves a CLI. to run the code, you can use the following command:

```
shvi fixtures/twinkle-twinkle.shvi
```

The line above should play the "Twinkle Twinkle Little Star" melody, once all the tests in `tokenizer.test.js` and `shvi.test.js` are passing.

Good luck!

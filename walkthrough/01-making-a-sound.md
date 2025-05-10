# Making a sound

Let's start with a simple thing: make Shvi play a 261.63 pitch for a second:

```lisp
tone 261.63 1000
```

> *Note, that the duration is specified in milliseconds.*

To do this we have to take care of these two things: 1) make Shvi understand the code and 2) encode it in a wave file. It is now so, that we make the computer go "beep" first, since parsing the code and evaluating it is equally interesting but slightly less interactive.

Sound can be thought of as a wave. It is a vibration that travels through the air (or any other medium) and can be heard when it reaches the ear. It can be represented as a sinusoid and described by its frequency and amplitude. The frequency is the number of cycles per second, and the amplitude is the height of the wave. The higher the frequency, the higher the pitch of the sound. The higher the amplitude, the louder the sound.

To describe and replay the sound with a computer, we can quantize the wave that produces it into a series of samples. Each sample is a number that represents the amplitude of the wave at a given point in time. The more samples we have, the more accurate the representation of the sound.

To generate the samples we just calculate the sine of the angle of the wave at a given point factoring in the amplitude, frequency and the consecutive number of the sample.

The formula for that looks like this:

    sample[n] = A ⋅ sin(2 * π * f * (n / R)​)

Where:

* **A** - Amplitude (max value based on bit depth, e.g., 32767 for 16-bit)
* **f** - Frequency (Hz), e.g., middle C = 261.63 Hz
* **R** - Sample rate (samples per second), typically 44100 Hz
* **n** - Sample number (integer), from 0 to R × duration − 1

<div style="text-align: center;">
  <img src="./images/01-pcm-sample-generation-sine-wave.png" alt="PCM Sample Generation: Sine Wave" style="width: 65%;">
  <img src="./images/01-pcm-sample-as-point-moving-along-unit-circle.png" alt="PCM Sample as Point Moving Along Unit Circle" style="width: 65%;">
</div>

Hopefully this was enough to get you started. The linked resources might also be helpful.

Now let's take a look at the code. In `shvi.test.js` at the root of the repo, you will find a test that checks if we are able to generate the PCM /Pulse-Modulated/ samples. The test is currently failing, and our task will be to implement it in `sintez.js` as the `generatePCM` function.

The `generatePCM` function takes the following parameters:

* `frequency` - The frequency of the sound wave in Hz.
* `duration` - The duration of the sound in seconds.

Once the `generatePCM` is implemented you should hear a second long beep. After you can move on to the [step two].

[step two]: ./02-a-better-language-for-instructions.md

----

* [Tone generator](https://onlinesound.net/tone-generator)
* [Sinusoid](https://tenor.com/view/sinusoide-gif-26675443)

#lang racket

(define to-int inexact->exact)

;; sample[n]= A ⋅ sin(2 * π * f * (n / R)​)

;; Where:
;;   A: Amplitude (max value based on bit depth, e.g., 32767 for 16-bit)
;;   f: Frequency (Hz), e.g., middle C = 261.63 Hz
;;   R: Sample rate (samples per second), typically 44100 Hz
;;   n: Sample number (integer), from 0 to R × duration − 1


;; Generate a vector of 16-bit PCM samples for a sine wave iteratively
(define (generate-pcm frequency duration-ms)
  (define amplitude 32767)
  (define sample-rate 44100)
  (define num-samples
    (floor (* sample-rate (/ duration-ms 1000))))
  (define samples (make-vector num-samples 0))

  (for ([i (in-range num-samples)])
    (let* ([t (/ i sample-rate)]
           [val (* amplitude (sin (* 2 pi frequency t)))]
           ;; round to nearest integer
           [pcm (to-int (round val))])
      (vector-set! samples i pcm)))
  samples)

;; Call it for middle C (261.63Hz) for 1000ms
(define pcm-data (generate-pcm 261.63 1000))

;; Print the pcm data
(display pcm-data)

;; The same function but using recursion
(define (generate-pcm-rec frequency duration-ms)
  (define amplitude 32767)
  (define sample-rate 44100)
  (define num-samples
    (floor (* sample-rate (/ duration-ms 1000))))

  (define gen
    (lambda (n)
      (if (= n num-samples)
          '()
          (cons
            (to-int
              (round
              (* amplitude
                  (sin (* 2 pi frequency (/ n sample-rate))))))
            (gen (+ n 1))))))
  (gen 0))

;; call it for middle D (293.66Hz) for 1000ms
(define pcm-data-rec (generate-pcm-rec 293.66 1000))

;; Print the pcm data
(display pcm-data-rec)

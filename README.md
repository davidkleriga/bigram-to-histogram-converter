# Bigram to Histogram Conver [ DK ]

## TypeScript
  great syntax for sudo-coding and fluent, highly-readable code
  Using a Bigram & Histogram Class to hold data to solve challenge
  Static Generators and converters isolate code implementation and describe work

## Mocha
  simple tests including samples plus a few other random bigram/histogram
  assert by comparing each result manually (hard-coded)


## Classes|
  #### Bigram { phrase: string; }
  #### Histogram { phrase: string, quantity: number; }
  #### HIstogramMap { [phraseKey:string]:Histogram }

---


## Install

`npm install`

## Run 

`./compile.sh'`

`node index test-1="hello world hello" test-2="the quick brown fox and the quick blue hare"`

`node index test="the quick brown fox and the quick blue hare"`

`node index test="long bigram of bigram of bigram of long long bigrams"`


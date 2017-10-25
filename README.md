# Bigram to Histogram Conver [ DK ]

## TypeScript
  great syntax for sudo-coding and fluent, highly-readable code
  Using a Bigram & Histogram Class to hold data to solve challenge
  Static Generators and converters isolate code implementation and describe work
  index.ts and index-tests.ts must be compiled via ./compiled.sh into index.js and index-tests.js

## Mocha
  simple tests including samples plus a few other random bigram/histogram
  assert by comparing each result manually (hard-coded)
  the `npm test` command will run a handful of preset bigram tests
  
## Command Line Run
  Samples below
  parameters including the string `test` will be parsed into histograms
  they must be valid strings and unique
  `node index.js test-1="the quick blue hare"`


## Classes|
  #### Bigram { phrase: string; }
  #### Histogram { phrase: string, quantity: number; }
  #### HIstogramMap { [phraseKey:string]:Histogram }

---


## Install

`git clone https://github.com/davidkleriga/bigram-to-histogram-converter.git`

`npm install`

## Run 

`./compile.sh'`

`node index test-1="hello world hello" test-2="the quick brown fox and the quick blue hare"`

`node index test="the quick brown fox and the quick blue hare"`

`node index test="long bigram of bigram of bigram of long long bigrams"`


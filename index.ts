

/**

  For the purposes of this coding challenge,
  the bigram and histogram data structures 
  will be assumed to be specific to each other. 
  no other relationships accounted for

  Static Parsers and Generators will be used to abstract code
  and create a fluent, readable syntax. The only object here 
  are data structures.

  If this process is called directly, command line arguments
  including the string 'test' will be accepted and printed 
  back out as a HistogramMap

*/

export class Bigram {
  phrase: string;
}

export class Histogram {
  phrase: string;
  quantity: number;
}

export class HistogramMap {
  [keyPhrase:string]: Histogram;
}

export class BigramParser {
  static fromString(input):HistogramMap {
    let parsingAlgorithm = (parseString) => {
      const SPACE_REG_EX = /\s/;
      let parseChunks = parseString.split(SPACE_REG_EX);
      let bigramCombinations = BigramGenerator.fromWords(parseChunks);
      let histogramCollection = bigramCombinations.map(BigramToHistogramConverter.convert.bind(this));
      let combinedHistograms = HistogramConsolidator.consolidate(histogramCollection);
      return combinedHistograms;
    };
    return parsingAlgorithm(input);
  }
}

const BIGRAM_LENGTH_MINIMUM = 2;

export class BigramGenerator {
  static fromWords(words = []): Bigram[] {
    if (words.length < BIGRAM_LENGTH_MINIMUM ) throw 'invalid input';
    let bigrams = [];
    if (words.length >= BIGRAM_LENGTH_MINIMUM) {
      for ( let outerWordIndex = 0; outerWordIndex <= words.length - BIGRAM_LENGTH_MINIMUM; outerWordIndex++ ) {
        let innerWordIndex = outerWordIndex + 1;
        if (innerWordIndex < words.length) {
          let phrase = `${words[outerWordIndex]} ${words[innerWordIndex]}`;
          bigrams.push({phrase});
        }
      }
    }
    return bigrams;
  }
}

export class HistogramConsolidator {
  static consolidate(histogramCollection = [] ): HistogramMap {
    let consolidatedMap: HistogramMap = {};
    histogramCollection.forEach(item => {
      let existingHistogram = consolidatedMap[item.phrase];
      if ( !!existingHistogram ) existingHistogram.quantity++;
      else consolidatedMap[item.phrase] = BigramToHistogramConverter.convert({phrase: item.phrase});
    });
    HistogramConsoleOutput.print(consolidatedMap);
    return consolidatedMap;
  }
}

export class BigramToHistogramConverter {
  static convert(bigram) {
    return { phrase: bigram.phrase, quantity: 1 };
  }
}

export class HistogramConsoleOutput {

  static print(histogramMap) {
    console.log({histogramMap});
  }
}



declare var process;
declare var require;
declare var module;

if ( require.main === module ) {
  console.log('called directly', '\n\n', 'this process will accept multiple arguments for bigram strings. the key must be uniquei and include "test"');
  let processArguments = process.argv;
  let [nodePath, processPath, ...parameters] = processArguments;
  Object.keys(parameters).forEach((key, index) => {
    let param = parameters[index];
    let [paramKey, paramValue] = param.split('=');
    if ( paramKey.indexOf('test') > -1 ) {
      let histogramMap = BigramParser.fromString(paramValue);
      HistogramConsoleOutput.print(histogramMap);
    }
  });
}


"use strict";
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
exports.__esModule = true;
var Bigram = /** @class */ (function () {
    function Bigram() {
    }
    return Bigram;
}());
exports.Bigram = Bigram;
var Histogram = /** @class */ (function () {
    function Histogram() {
    }
    return Histogram;
}());
exports.Histogram = Histogram;
var HistogramMap = /** @class */ (function () {
    function HistogramMap() {
    }
    return HistogramMap;
}());
exports.HistogramMap = HistogramMap;
var BigramParser = /** @class */ (function () {
    function BigramParser() {
    }
    BigramParser.fromString = function (input) {
        var _this = this;
        var parsingAlgorithm = function (parseString) {
            var SPACE_REG_EX = /\s/;
            var parseChunks = parseString.split(SPACE_REG_EX);
            var bigramCombinations = BigramGenerator.fromWords(parseChunks);
            var histogramCollection = bigramCombinations.map(BigramToHistogramConverter.convert.bind(_this));
            var combinedHistograms = HistogramConsolidator.consolidate(histogramCollection);
            return combinedHistograms;
        };
        return parsingAlgorithm(input);
    };
    return BigramParser;
}());
exports.BigramParser = BigramParser;
var BIGRAM_LENGTH_MINIMUM = 2;
var BigramGenerator = /** @class */ (function () {
    function BigramGenerator() {
    }
    BigramGenerator.fromWords = function (words) {
        if (words === void 0) { words = []; }
        if (words.length < BIGRAM_LENGTH_MINIMUM)
            throw 'invalid input';
        var bigrams = [];
        if (words.length >= BIGRAM_LENGTH_MINIMUM) {
            for (var outerWordIndex = 0; outerWordIndex <= words.length - BIGRAM_LENGTH_MINIMUM; outerWordIndex++) {
                var innerWordIndex = outerWordIndex + 1;
                if (innerWordIndex < words.length) {
                    var phrase = words[outerWordIndex] + " " + words[innerWordIndex];
                    bigrams.push({ phrase: phrase });
                }
            }
        }
        return bigrams;
    };
    return BigramGenerator;
}());
exports.BigramGenerator = BigramGenerator;
var HistogramConsolidator = /** @class */ (function () {
    function HistogramConsolidator() {
    }
    HistogramConsolidator.consolidate = function (histogramCollection) {
        if (histogramCollection === void 0) { histogramCollection = []; }
        var consolidatedMap = {};
        histogramCollection.forEach(function (item) {
            var existingHistogram = consolidatedMap[item.phrase];
            if (!!existingHistogram)
                existingHistogram.quantity++;
            else
                consolidatedMap[item.phrase] = BigramToHistogramConverter.convert({ phrase: item.phrase });
        });
        HistogramConsoleOutput.print(consolidatedMap);
        return consolidatedMap;
    };
    return HistogramConsolidator;
}());
exports.HistogramConsolidator = HistogramConsolidator;
var BigramToHistogramConverter = /** @class */ (function () {
    function BigramToHistogramConverter() {
    }
    BigramToHistogramConverter.convert = function (bigram) {
        return { phrase: bigram.phrase, quantity: 1 };
    };
    return BigramToHistogramConverter;
}());
exports.BigramToHistogramConverter = BigramToHistogramConverter;
var HistogramConsoleOutput = /** @class */ (function () {
    function HistogramConsoleOutput() {
    }
    HistogramConsoleOutput.print = function (histogramMap) {
        console.log({ histogramMap: histogramMap });
    };
    return HistogramConsoleOutput;
}());
exports.HistogramConsoleOutput = HistogramConsoleOutput;
if (require.main === module) {
    console.log('called directly', '\n\n', 'this process will accept multiple arguments for bigram strings. the key must be uniquei and include "test"');
    var processArguments = process.argv;
    var nodePath = processArguments[0], processPath = processArguments[1], parameters_1 = processArguments.slice(2);
    Object.keys(parameters_1).forEach(function (key, index) {
        var param = parameters_1[index];
        var _a = param.split('='), paramKey = _a[0], paramValue = _a[1];
        if (paramKey.indexOf('test') > -1) {
            var histogramMap = BigramParser.fromString(paramValue);
            HistogramConsoleOutput.print(histogramMap);
        }
    });
}

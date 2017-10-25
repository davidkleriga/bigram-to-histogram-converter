import {
  Bigram, Histogram,
  BigramParser, HistogramConsolidator, 
  BigramToHistogramConverter, HistogramConsoleOutput} from './index';
import * as mocha from 'mocha';
import * as chai from 'chai';

const {expect} = chai;

const { 
  describe, it,
  // before, beforeEach, after 
} = mocha;

console.log('running tests');

describe('bigram parser', function() {

  it('compiles', () => {
    expect(true).to.equal(true);
  });

  it('can generate a histogram with a single bigram', () => {
    let phrase = 'hello world';
    let histogramResult = BigramParser.fromString(phrase);
    expect(histogramResult[phrase].phrase).to.equal(phrase);
    expect(histogramResult[phrase].quantity).to.equal(1);
    expect(Object.keys(histogramResult).length).to.equal(1);
    console.log(`${Object.keys(histogramResult).length} bigram-keys for ${phrase}`);
  });

  it('can generate multiple histograms from multiple bigrams', () => {
    let phrase = 'hello world hello beautiful hello world';
    let histogramResult = BigramParser.fromString(phrase);
    expect(histogramResult['hello world'].quantity).to.equal(2);
    expect(histogramResult['world hello'].quantity).to.equal(1);
    expect(histogramResult['hello beautiful'].quantity).to.equal(1);
    expect(histogramResult['beautiful hello'].quantity).to.equal(1);
    expect(Object.keys(histogramResult).length).to.equal(4);
    console.log(`${Object.keys(histogramResult).length} bigram-keys`);
  });

  it('passes the input provided on the exercise example', () => {
    let phrase = 'the quick brown fox and the quick blue hare';
    let histogramResult = BigramParser.fromString(phrase);
    expect(histogramResult['the quick'].quantity).to.equal(2);
    expect(histogramResult['quick brown'].quantity).to.equal(1);
    expect(histogramResult['brown fox'].quantity).to.equal(1);
    expect(histogramResult['fox and'].quantity).to.equal(1);
    expect(histogramResult['and the'].quantity).to.equal(1);
    expect(histogramResult['quick blue'].quantity).to.equal(1);
    expect(histogramResult['blue hare'].quantity).to.equal(1);
    expect(Object.keys(histogramResult).length).to.equal(7);
    console.log(`${Object.keys(histogramResult).length} bigram-keys for ${phrase}`);
  });

  it('passes random bigram variations 1', () => {
    let phrase = 'the quick brown fox quick blue and the quick brown and the quick blue hare';
    let histogramResult = BigramParser.fromString(phrase);
    expect(histogramResult['the quick'].quantity).to.equal(3);
    expect(histogramResult['quick brown'].quantity).to.equal(2);
    expect(histogramResult['brown fox'].quantity).to.equal(1);
    expect(histogramResult['fox quick'].quantity).to.equal(1);
    expect(histogramResult['brown and'].quantity).to.equal(1);
    expect(histogramResult['blue and'].quantity).to.equal(1);
    expect(histogramResult['and the'].quantity).to.equal(2);
    expect(histogramResult['quick blue'].quantity).to.equal(2);
    expect(histogramResult['blue hare'].quantity).to.equal(1);
    expect(Object.keys(histogramResult).length).to.equal(9);
    console.log(`${Object.keys(histogramResult).length} bigram-keys for ${phrase}`);
  });

  it('passes random bigram variations 2', () => {
    let phrase = 'long bigram of bigram of bigram of long long bigrams';
    let histogramResult = BigramParser.fromString(phrase);
    expect(histogramResult['long bigram'].quantity).to.equal(1);
    expect(histogramResult['long bigrams'].quantity).to.equal(1);
    expect(histogramResult['bigram of'].quantity).to.equal(3);
    expect(histogramResult['of bigram'].quantity).to.equal(2);
    expect(histogramResult['of long'].quantity).to.equal(1);
    expect(histogramResult['long long'].quantity).to.equal(1);
    expect(Object.keys(histogramResult).length).to.equal(6);
    console.log(`${Object.keys(histogramResult).length} bigram-keys for ${phrase}`);
  });
});
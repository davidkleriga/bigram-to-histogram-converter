"use strict";
exports.__esModule = true;
var index_1 = require("./index");
var mocha = require("mocha");
var chai = require("chai");
var expect = chai.expect;
var describe = mocha.describe, it = mocha.it;
console.log('running tests');
describe('bigram parser', function () {
    it('compiles', function () {
        expect(true).to.equal(true);
    });
    it('can generate a histogram with a single bigram', function () {
        var phrase = 'hello world';
        var histogramResult = index_1.BigramParser.fromString(phrase);
        expect(histogramResult[phrase].phrase).to.equal(phrase);
        expect(histogramResult[phrase].quantity).to.equal(1);
        expect(Object.keys(histogramResult).length).to.equal(1);
        console.log(Object.keys(histogramResult).length + " bigram-keys for " + phrase);
    });
    it('can generate multiple histograms from multiple bigrams', function () {
        var phrase = 'hello world hello beautiful hello world';
        var histogramResult = index_1.BigramParser.fromString(phrase);
        expect(histogramResult['hello world'].quantity).to.equal(2);
        expect(histogramResult['world hello'].quantity).to.equal(1);
        expect(histogramResult['hello beautiful'].quantity).to.equal(1);
        expect(histogramResult['beautiful hello'].quantity).to.equal(1);
        expect(Object.keys(histogramResult).length).to.equal(4);
        console.log(Object.keys(histogramResult).length + " bigram-keys");
    });
    it('passes the input provided on the exercise example', function () {
        var phrase = 'the quick brown fox and the quick blue hare';
        var histogramResult = index_1.BigramParser.fromString(phrase);
        expect(histogramResult['the quick'].quantity).to.equal(2);
        expect(histogramResult['quick brown'].quantity).to.equal(1);
        expect(histogramResult['brown fox'].quantity).to.equal(1);
        expect(histogramResult['fox and'].quantity).to.equal(1);
        expect(histogramResult['and the'].quantity).to.equal(1);
        expect(histogramResult['quick blue'].quantity).to.equal(1);
        expect(histogramResult['blue hare'].quantity).to.equal(1);
        expect(Object.keys(histogramResult).length).to.equal(7);
        console.log(Object.keys(histogramResult).length + " bigram-keys for " + phrase);
    });
    it('passes random bigram variations 1', function () {
        var phrase = 'the quick brown fox quick blue and the quick brown and the quick blue hare';
        var histogramResult = index_1.BigramParser.fromString(phrase);
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
        console.log(Object.keys(histogramResult).length + " bigram-keys for " + phrase);
    });
    it('passes random bigram variations 2', function () {
        var phrase = 'long bigram of bigram of bigram of long long bigrams';
        var histogramResult = index_1.BigramParser.fromString(phrase);
        expect(histogramResult['long bigram'].quantity).to.equal(1);
        expect(histogramResult['long bigrams'].quantity).to.equal(1);
        expect(histogramResult['bigram of'].quantity).to.equal(3);
        expect(histogramResult['of bigram'].quantity).to.equal(2);
        expect(histogramResult['of long'].quantity).to.equal(1);
        expect(histogramResult['long long'].quantity).to.equal(1);
        expect(Object.keys(histogramResult).length).to.equal(6);
        console.log(Object.keys(histogramResult).length + " bigram-keys for " + phrase);
    });
});

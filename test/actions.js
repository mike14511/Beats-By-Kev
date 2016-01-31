
var AlchemyAPI = require('alchemy-api');
var alchemy = new AlchemyAPI('e39bd83160377abbf87bb61156870bc47f30841e');

var relations = require('../sampledata/alchemyOutput').relations;

var adder = require('../util/line_generator');
var ARTICLES = ['a', 'A', 'an', 'An', 'The', 'the'];


var processPair = adder.addRelationship;


relations.forEach(function(relation) {
    if(relation.length == 0) return;
    
    relation.forEach(function(r) {
//        console.log(r);

        var pair = {};

        var noun_words = r.subject.text.split(' ');
        if(ARTICLES.indexOf(noun_words[0]) >= 0) {
            noun_words.splice(0, 1);
        }
        pair.noun = noun_words.join(' ');
        pair.verb = r.action.lemmatized;

        processPair(pair);
    });
});

return;
// for getting json
var sentences = require('../sampledata/sentences').samples;

sentences.forEach(function(s) {
    alchemy.relations(s, {}, function(err, results) {

        if(err) {
            console.log('error');
            console.log(err);
            return;
        }

        console.log(results.relations);
    });
});

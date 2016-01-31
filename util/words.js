var CMUDict = require('cmudict').CMUDict;
var cmudict = new CMUDict();
var chalk = require('chalk');
var _ = require('underscore');

var settings = require('../settings');

var vowels = [
    'AA',
    'AE',
    'AH',
    'AO',
    'AW',
    'AY',
    'EH',
    'ER',
    'EY',
    'IH',
    'IY',
    'OW',
    'OY',
    'UH',
    'UW'
];

var nano = require('nano')({
  url : "https://" + settings.cloudant['account'] + ".cloudant.com",
  requestDefaults : {
    auth : {
      user : settings.cloudant['apiKey'],
      pass : settings.cloudant['apiPass']
    }
  // enable for debug
      //, "log" : function (id, args) { console.log(id, args); }
    }
});

var words = nano.use("words");

/**
 * takes in a json word object, and returns a json object
 * access word string at word.word
 */
module.exports.prepare_word = function (word, next) {
    console.log("Preparing word: " + word.word);
    var word = word.word;
    var wordArray = word.split(' ');
    word = wordArray[wordArray.length - 1];
    if(!word.word) {
        console.log(word);
    }
    var phoneme_str = cmudict.get(word);
    if(!phoneme_str) console.log('cmudict failed for %s', chalk.red(word));
    var phoneme_array = phoneme_str.split(' ');
    clean_phoneme_array = _.map(phoneme_array, function(phoneme) {
      if (phoneme.length > 2) {
        return phoneme.slice(0, 2);
      }
        else {
        return phoneme;
      }
    });
    var rev_phoneme_array = clean_phoneme_array.slice(); //make a copy because .reverse() reverses the current object
    rev_phoneme_array.reverse();

    return {
        word: word,
        pron: clean_phoneme_array,
        rev_pron: rev_phoneme_array
    }
}

module.exports.insert_word = function (preparedWord, next) {
  //var preparedWord = prepare_word(word);
  words.insert(preparedWord, preparedWord.word, function (err, body) {
    next(err, body);
  });
}

module.exports.get_rhymes = function(word, next) {
  key = get_end(word.rev_pron);
  console.log("Key: " + key);
  words.view('words', "by_rev_pron", {"keys":[key.toString()], "include_docs":true}, function(err, body) {
    var words = _.map(body.rows, function (doc) {
      return doc.doc;
    });
    next(err, {docs:words});
  });
}

var get_end = function (rev_pron, next) {
  var firstVowel = _.findIndex(rev_pron, function (phoneme) {
    return _.contains(vowels, phoneme);
  });
  return rev_pron.slice(0, firstVowel+1);
}

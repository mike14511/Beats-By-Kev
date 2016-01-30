var util_words = require('../util/words');
var _ = require("underscore");

var test_words = [
    'string',
    'ping',
    'think',
    'sink',
    'stink',
    'thank',
    'spunk'
]

var full_word_objects = [];

test_words.forEach(function(word) {
    var word_obj = util_words.prepare_word(word);
    full_word_objects.push(word_obj);
});

var test_function = function(word, callback) {
    var expected = {
        docs:    [
            {word: 'think'},
            {word: 'sink'},
            {word: 'stink'}
//             {word: 'thank'} // uncomment to test failure
        ]
    };
    
    callback(null, expected);
};

var real_function = function (word, callback) {
  var preparedWord = util_words.prepare_word(word);
  util_words.get_rhymes(preparedWord, function (err, body) {
    callback(err, body);
  });
}

// 
module.exports.test_rhyme_pink = function(test) {

    // results is an array of word docs
    real_function('pink', function(err, results) {
        
        var docs = results.docs;
        
        var should_rhyme = [ 
            'think',
            'sink',
            'stink'
        ];
        test.equal(should_rhyme.length, docs.length, 'found wrong number of results');

        docs.forEach(function(word) {
            test.ok(should_rhyme.indexOf(word.word) >= 0, 'should not contain ' + word.word);
        });
        
        test.done();
    });
}

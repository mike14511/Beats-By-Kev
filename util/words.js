var CMUDict = require('cmudict').CMUDict;
var cmudict = new CMUDict();

/**
 * takes in a string, and returns a string objecdt
 */
module.exports.prepare_word = function (word) {
    var phoneme_str = cmudict.get(word);
    var phoneme_array = phoneme_str.split(' ');
    var rev_phoneme_array = phoneme_array.reverse();

    return {
        word: word,
        pron: phoneme_array,
        rev_pron: rev_phoneme_array
    }
}

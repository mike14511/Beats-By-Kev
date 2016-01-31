var util_words = require('../util/words');
var settings = require('../settings');
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
// http://stackoverflow.com/questions/610406/javascript-equivalent-to-printf-string-format
String.prototype.format = function() {
    var formatted = this;
    for (var i = 0; i < arguments.length; i++) {
        var regexp = new RegExp('\\{'+i+'\\}', 'gi');
        formatted = formatted.replace(regexp, arguments[i]);
    }
    return formatted;
};

var chalk = require('chalk');

var LINE_A = "if that {0} don't {1}, ";
var LINE_B = "momma's gonna buy you a {0}";
var LINE_Z = "Hey little buddy, this won't rhyme, ";
var LINE_Y = "this won't rhyme either, but thanks for your time.";

/**
 * generates line text based on two nouns and a verb
 */
function genLineText(n0, v1, n1) {
    return LINE_A.format(n0, v1) +  LINE_B.format(n1);
}


//console.log(genLineText('mockingbird', 'sing', 'ring'));
//console.log(genLineText('mockingbird', 'sing', 'ring'));

var data = require('../sampledata/beforeAfter').after;

function startFromZero(nounZero, maxLines, callback) {
    // if (!cloudant contains nounZero)
    //   tell user to pick a new noun, or... ask them for a verb that nounZero does
    //   then add that verb...

    var allLines = [];
    var lineZero = LINE_Z + LINE_B.format(nounZero);
    allLines.push(lineZero);

    var currentNoun = nounZero;
    var currentVerb = null;
    
    generateNewLine(allLines, nounZero, maxLines, function(err, allLines) {
        callback(err, allLines);
    });
    
}

function generateNewLine(allLines, currentNoun, maxLines, callback) {

    // all have been added
    if(allLines.length >= maxLines) {

        var lastLine = LINE_A + LINE_Y.format(currentNoun);
        console.log(chalk.yellow(lastLine));
        console.log(chalk.red('done adding'));
        allLines.push(lastLine);
        callback(null, allLines);
        return;
    }
    
    getActionFromCloudant(currentNoun, function(err, nextVerb) {
        console.log('got next verb %s', chalk.blue(nextVerb), ' from cloudant');
        
        // could not find matching verb
        if(err || ! nextVerb) {
            // TODO something different
            var lastLine = LINE_A.format(currentNoun, nextVerb) + LINE_Y;
            allLines.push(lastLine);
            callback(null, allLines);
            return;
        }

        // add last special line
        if(allLines.length + 1 == maxLines) {
            var lastLine = LINE_A.format(currentNoun, nextVerb) + LINE_Y.format(currentNoun);
            console.log(chalk.red('reached last line'));
            console.log(chalk.yellow(lastLine));
            allLines.push(lastLine);
            callback(null, allLines);
            return;
        }
        
        getRhymingNounFromCloudant(nextVerb, function(err, nextNoun) {
            
            console.log('got next noun %s', chalk.green(nextNoun), 'from cloudant');
            var fullLine = genLineText(currentNoun, nextVerb, nextNoun);            
            console.log(chalk.yellow(fullLine));

            allLines.push(fullLine);

            generateNewLine(allLines, nextNoun, maxLines, callback);
            
        });
        
    });
}


var getActionFromCloudant = function(noun, callback) {

    var randomVerbs = ['yuzz', 'beft', 'kweet', 'zamp', 'zax', 'skritz'];
    var randomVerb = randomVerbs[Math.floor( Math.random() * randomVerbs.length)];
    // TODO get an action
    callback(null, randomVerb);
};

var getRhymingNounFromCloudant = function(verb, callback) {

    var rhymingNouns = {
        'yuzz': 'orange fuzz',
        'beft': 'opelkleft',
        'kweet': 'tooterpeet',
        'zamp': 'oil lamp',
        'zax': 'rusty sax',
        'skritz': 'scrupaflitz'
    };
    var rhymingNoun = rhymingNouns[verb]
    // TODO get an action
    callback(null, rhymingNoun);
};

/**
 * takes a noun-verb pair
 */
function addRelationship(pair) {
    
    //Look for a noun first
    //Noun and verb are two different documents
    
    words.get(pair.noun, {revs_info: false }, function(err, body) {
      //we couldn't find this word
    if (err) {
      var wordToAdd = {};
      //Get the pron info first
      wordToAdd = util_words.prepare_word({"word":pair.noun});
      //Then add in some extra info
      wordToAdd.noun = pair.noun;
      wordToAdd.actions = [pair.verb];
      
        util_words.insert_word(wordToAdd, function (err, body) {
          if (err) {
            console.log("Error adding relationship: " + err);
          }
        });
    }
    else {
      //We found the word.
      oldWord = body;
      oldWord.actions.push(pair.verb)
      notes.insert(oldWord, oldWord._id, function(err, doc) {
        if (err) {
          console.log("Error updating word with new verb: " + err);
        }
      });
    }
    
    words.get(pair.verb, {revs_info: false }, function(err, body) {
      //we couldn't find this word
    if (err) {
      var wordToAdd = {};
      //Get the pron info first
      wordToAdd = util_words.prepare_word({"word":pair.verb});
      //Then add in some extra info
      wordToAdd.verb = pair.verb;
      wordToAdd.actors = [pair.noun];
      
        util_words.insert_word(wordToAdd, function (err, body) {
          if (err) {
            console.log("Error adding relationship (verb: " +pair.verb+ "): " + err);
          }
        });
    }
    else {
      //We found the word.
      oldWord = body;
      oldWord.actors.push(pair.noun)
      notes.insert(oldWord, oldWord._id, function(err, doc) {
        if (err) {
          console.log("Error updating word with new verb: " + err);
        }
      });
    }
}

module.exports.startFromZero = startFromZero;

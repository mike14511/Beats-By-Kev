var CMUDict = require('cmudict').CMUDict,
    cmudict = new CMUDict(),
    chalk = require('chalk');


var raps = [
    'nervous',
    'surface',
    'bottles',
    'chicago',
    'sorrow',
    'problem'
]

raps.forEach(function(word) {
    var pron = cmudict.get(word);
    console.log(chalk.green(word), chalk.blue(pron));
});


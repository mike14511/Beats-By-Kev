var express = require('express'),
    path = require('path'),
    logger = require('morgan');


var lineGen = require('./util/line_generator');

var app = express();

var port = process.env.VCAP_APP_PORT || 1337;

app.use(logger('dev'));

app.use(express.static(path.join(__dirname, 'public')));

app.get('/song/:word', function(req, res) {

    var nounZero = req.params.word;

    lineGen.startFromZero(nounZero, 10, function(err, allLines) {
        
        res.send(allLines);
    });
});


var server = app.listen(port, function(){
  console.log("listening on port", server.address().port);
});

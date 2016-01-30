var express = require('express'),
    path = require('path'),
    logger = require('morgan');

var app = express();

var port = process.env.VCAP_APP_PORT || 1337;

app.use(logger('dev'));

app.use(express.static(path.join(__dirname, 'public')));

var server = app.listen(port, function(){
  console.log("listening on port", server.address().port);
});

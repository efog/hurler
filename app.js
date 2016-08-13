var express = require('express');
var app = express();
var port = process.env.PORT || 6969;

app.use(express.static('app'));

app.listen(port, function () {
    console.log('Example app listening on port %s!', port);
});
var express = require('express');
var app = express();

var config = require('./config');
app.use(express.static(__dirname));

app.use((_, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});


app.use('/*', (_, res) => {
    res.sendFile('index.html', { root: __dirname });
});

app.listen(config.port, (err) => {
    console.log(err || `Listening on port : ${config.port}`)
});

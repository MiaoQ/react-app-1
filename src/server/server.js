var host = '172.17.144.31';
var port = 80;

var Emotiondb = require("../db/mongodb");
var myEmotiondb = new Emotiondb('MIAO');

var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var join = require("path").join;

var urlencodedParser = bodyParser.urlencoded({extended: false});

app.use(express.static('build'));

app.get('/', function(req, res){  
    res.sendfile(join(__dirname,'../../build/index.html'));
});

app.get('/getrecords', function(req, res){
    myEmotiondb.findEmotions(5).then((result) => {
        res.end(JSON.stringify(result));
    });
});

app.post('/addrecord', urlencodedParser, function(req, res){
    var obj = req.body;
    myEmotiondb.insertEmotion(obj).then(() => {
        myEmotiondb.findEmotions(5).then((result) => {
            res.end(JSON.stringify(result));
        });
    });
});

app.post('/delrecord', urlencodedParser, function(req, res){
    var queryObj = req.body;
    myEmotiondb.deleteEmotion(queryObj).then(() => {
        myEmotiondb.findEmotions(5).then((result) => {
            res.end(JSON.stringify(result));
        });
    });
});

var server = app.listen(port, host, function(){
    console.log("应用实例，访问地址为 http://%s:%s", host, port)
});












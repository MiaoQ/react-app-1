const host = '172.17.144.31';
const port = 80;

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({extended: false});
const join = require("path").join;

app.use(express.static('build'));

app.get('/', function(req, res){  
    res.sendfile(join(__dirname,'../../build/index.html'));
});

app.post('/checkaccount', urlencodedParser, function(req, res){
    handleCheckAccount(req.body).then((result) => {
        res.setHeader('content-type', 'application/json;charset=utf-8');
        if (result.length === 1) {
            let encodeCookie = new Buffer(JSON.stringify(result[0])).toString('base64');
                encodeCookie = 'userInfo=' + encodeCookie;
            res.setHeader('Set-Cookie', encodeCookie);
        }
        res.end(JSON.stringify(result));
    });
});

app.get('/getrecords', function(req, res){
    let userInfo = JSON.parse(new Buffer(req.headers.cookie.substring(9), 'base64').toString());
    handleGetrecords(userInfo.emotioncollection).then((result) => {
        res.setHeader('content-type', 'application/json;charset=utf-8');
        res.end(JSON.stringify(result));
    });
});

app.post('/addrecord', urlencodedParser, function(req, res){
    let userInfo = JSON.parse(new Buffer(req.headers.cookie.substring(9), 'base64').toString());
    if (req.body.user) {
        req.body.user = JSON.parse(req.body.user);
        req.body.user.$id = ObjectID(req.body.user.$id);
    }
    handleAddrecord(req.body, userInfo.emotioncollection).then((result) => {
        res.setHeader('content-type', 'application/json;charset=utf-8');
        res.end(JSON.stringify(result));
    });
});

app.post('/delrecord', urlencodedParser, function(req, res){
    let userInfo = JSON.parse(new Buffer(req.headers.cookie.substring(9), 'base64').toString());
    handleDelrecord(req.body, userInfo.emotioncollection).then((result) => {
        res.setHeader('content-type', 'application/json;charset=utf-8');
        res.end(JSON.stringify(result));
    });
});

/*-----------------database operations-----------------*/
const ObjectID = require('mongodb').ObjectID;
const Accountdb = require("../db/accountdb");
const userAccountdb = new Accountdb();
const Emotiondb = require("../db/emotiondb");

function handleCheckAccount(obj) {
    return new Promise((resolve, reject) => {
        userAccountdb.initCollection().then(() => {
            userAccountdb.checkAccount(obj).then((result) => {
                resolve(result);
            });
        });
    });
}

/*function handleGetrecords() {
    return new Promise((resolve, reject) => {
        userAccountdb.findAllAccounts().then(result => {
            Promise.all(result.map(user => {
                return new Promise((resolve, reject) => {
                    let emotion = new Emotiondb(user.emotioncollection);
                    emotion.findEmotions(5).then((result) => {
                        resolve(result);
                    });
                })
            })).then((result) => {
                let ret = [];
                ret = ret.concat.apply(ret, result);
                resolve(ret);
            });
        });
    });
}*/

function handleGetrecords(emotioncollection) {
    let emotion = new Emotiondb(emotioncollection);
    return new Promise((resolve, reject) => {
        emotion.createEmotionCollection().then(() => {
            emotion.findEmotions(5).then((result) => {
                resolve(result);
            });
        });
    });
}

function handleAddrecord(obj, emotioncollection) {
    let emotion = new Emotiondb(emotioncollection);
    return new Promise((resolve, reject) => {
        emotion.insertEmotion(obj).then(() => {
            emotion.findEmotions(5).then((result) => {
                resolve(result);
            });
        });
    });
}

function handleDelrecord(queryObj, emotioncollection) {
    let emotion = new Emotiondb(emotioncollection);
    return new Promise((resolve, reject) => {
        emotion.deleteEmotion(queryObj).then(() => {
            emotion.findEmotions(5).then((result) => {
                resolve(result);
            });
        });
    });
}
/*-------------------database operations end------------------*/

let server = app.listen(port, host, function(){
    console.log("应用实例，访问地址为 http://%s:%s", host, port)
});












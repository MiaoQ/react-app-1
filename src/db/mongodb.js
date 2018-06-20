var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017";

class Emotiondb {
    constructor(user) {
        this.user = user;
    }
    createEmotionCollection() {
        var that = this;
        return new Promise((resolve, reject) => {
            MongoClient.connect(url, (err, db) => {
                if (err) throw err;
                db.db("EMOTION").createCollection(that.user, (err, res) => {
                    if (err) throw err;
                    db.close();
                    resolve();
                });
            })
        });
    }
    insertEmotion(obj) {
        var that = this;
        return new Promise((resolve, reject) => {
            MongoClient.connect(url, (err, db) => {
                if (err) throw err;
                var dbo = db.db("EMOTION");
                if (Array.isArray(obj)) {
                    dbo.collection(that.user).insertMany(obj, (err, res) => {
                        if (err) throw err;
                        db.close();
                        resolve();
                    });
                } else {
                    dbo.collection(that.user).insertOne(obj, (err, res) => {
                        if (err) throw err;
                        db.close();
                        resolve();
                    });
                }
            });
        });
    }
    updateEmotion(queryObj, newObj) {
        var that = this;
        return new Promise((resolve, reject) => {
            MongoClient.connect(url, (err, db) => {
                if (err) throw err;
                var dbo = db.db("EMOTION");
                dbo.collection(that.user).updateOne(queryObj, {$set: newObj}, (err, res) => {
                    if (err) throw err;
                    db.close();
                    resolve();
                });
            });
        });
    }
    deleteEmotion(queryObj) {
        var that = this;
        return new Promise((resolve, reject) => {
            MongoClient.connect(url, (err, db) => {
                if (err) throw err;
                var dbo = db.db("EMOTION");
                dbo.collection(that.user).deleteOne(queryObj, (err, res) => {
                    if (err) throw err;
                    db.close();
                    resolve();
                });
            });
        });
    }
    findEmotions(count) {
        var that = this;
        var asend = {key: 1},
            desend = {key: -1};
        return new Promise((resolve, reject) => {
            MongoClient.connect(url, (err, db) => {
                if (err) throw err;
                var dbo = db.db("EMOTION");
                dbo.collection(that.user).find().sort(desend).limit(count).toArray(function(err, res) {
                    if (err) throw err;
                    db.close();
                    resolve(res);
                });
            });
        });
    }
}

module.exports = Emotiondb;
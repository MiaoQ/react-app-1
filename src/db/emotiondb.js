var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017";

class Emotiondb {
    constructor(user) {
        this.database = "emotions";
        this.collection = user;
    }
    createEmotionCollection() {
        var that = this;
        return new Promise((resolve, reject) => {
            MongoClient.connect(url, (err, db) => {
                if (err) throw err;
                db.db(that.database).createCollection(that.collection, (err, res) => {
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
                /*if (Array.isArray(obj)) {
                    db.db(that.database).collection(that.collection)
                    .insertMany(obj, (err, res) => {
                        if (err) throw err;
                        db.close();
                        resolve();
                    });
                } else {*/
                    db.db(that.database).collection(that.collection)
                    .insertOne(obj, (err, res) => {
                        if (err) throw err;
                        db.close();
                        resolve();
                    });
                //}
            });
        });
    }
    updateEmotion(queryObj, newObj) {
        var that = this;
        return new Promise((resolve, reject) => {
            MongoClient.connect(url, (err, db) => {
                if (err) throw err;
                db.db(that.database).collection(that.collection)
                .updateOne(queryObj, {$set: newObj}, (err, res) => {
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
                db.db(that.database).collection(that.collection)
                .deleteOne(queryObj, (err, res) => {
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
                db.db(that.database).collection(that.collection)
                .find().sort(desend).limit(count).toArray(function(err, res) {
                    if (err) throw err;
                    db.close();
                    resolve(res);
                });
            });
        });
    }
}

module.exports = Emotiondb;
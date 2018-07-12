var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017";

class Accountdb {
    constructor() {
        this.database = "accounts";
        this.collection = "accounts";
    }
    initCollection() {
        var that = this;
        return new Promise((resolve, reject) => {
            MongoClient.connect(url, (err, db) => {
                if (err) throw err;
                db.db(that.collection).createCollection(that.collection, (err, res) => {
                    if (err) throw err;
                    db.close();
                    resolve();
                });
            });
        });
    }
    /*creatAccount(obj) {
        var that = this;
        return new Promise((resolve, reject) => {
            MongoClient.connect(url, (err, db) => {
                if (err) throw err;
                db.db(that.database).collection(that.collection)
                .insertOne(obj, (err, res) => {
                    if (err) throw err;
                    db.close();
                    resolve(res);
                });
            });
        });
    }*/
    checkAccount(obj) {
        var that = this;
        return new Promise((resolve, reject) => {
            MongoClient.connect(url, (err, db) => {
                if (err) throw err;
                db.db(that.database).collection(that.collection)
                .find({username: obj.username, password: obj.password})
                .toArray(function(err, res){
                    if (err) throw err;
                    resolve(res);
                });
                db.close();
            });
        });
    }
    findAllAccounts() {
        var that = this;
        return new Promise((resolve, reject) => {
            MongoClient.connect(url, (err, db) => {
                if (err) throw err;
                db.db(that.database).collection(that.collection)
                .find()
                .toArray(function(err, res){
                    if (err) throw err;
                    resolve(res);
                });
                db.close();
            });
        });
    }
}

module.exports = Accountdb;























const { MongoClient } = require('mongodb');


class Db {
    constructor(){
        this.mongoConnectionUri = 'mongodb://localhost:27017';
        this.client = {};
        this.dbName = '';
        this.collectionName = ''
    }

    async setDbName(dbName){
        this.dbName = dbName
    }

    async setCollectionName(collectionName){
        this.collectionName = collectionName
    }


    async init(){
        this.client = await new MongoClient(this.mongoConnectionUri).connect();
    }

    findMany = async (parameter) =>  {
        const db = this.client.db(this.dbName);
        const collection = db.collection(this.collectionName);
        const record = collection.find({
            visitorId: parameter.visitorId
        }).toArray();
        if (!record) {
            return "Error Mongo "+record
        }

        return record
    }

    updateDocument = async (document) =>  {
        const db = this.client.db(this.dbName);
        const collection = db.collection(this.collectionName);
        const record = collection.updateOne({
            bookId: document.bookId,
            visitorId: document.visitorId
        }, {
            $set: document
        }, { upsert: true});
        if (!record) {
            return "Error Mongo "+record
        }

        return record
    }
}

module.exports = Db;
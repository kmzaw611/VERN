/*
 * I will use this file to store URI and connection in the future
 * But for now it is useless so dont worry about it
 */

var MongoClient = require('mongodb').MongoClient;
var uri = "mongodb://mwithero:Superaxeman123@<hostname>/test_database?ssl=true&replicaSet=atlas-44m1z8-shard-0&authSource=admin&retryWrites=true&w=majority";
MongoClient.connect(uri, function (err, client) {
    const collection = client.db("test").collection("devices");
    // perform actions on the collection object
    client.close();
});
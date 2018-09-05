"use strict"

const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const bodyParser = require('body-parser');
const http = require('http');
const app = express();

app.use(bodyParser.urlencoded({extended: true}))

// Connection URL
const url = 'mongodb://lida:1idakick@ds020208.mlab.com:20208/uav-lida';
// Database Name
const dbName = 'uav-lida';

app.get('/info', (req,res) => {
    //http://localhost/info?uav[id]=1&uav[mission]=Tour%20around%20Poseidon&gps[lat]=12.345422&gps[long]=101.235342&lida[depth]=2.21&servo[degree]=127.25&time=10.32
    res.send('First checkpoint');
    //console.log(db.collection(req.query.uav.mission));
    MongoClient.connect(url, { useNewUrlParser: true }, function(err, client) {
        assert.equal(null, err);
        const db = client.db(dbName);
        const collection = db.collection(req.query.uav.mission);
        collection.insertOne(req.query, function(err, result) {
            assert.equal(null, err);
        });
        client.close();
    });
    console.log(req.query);
});

app.get('/', (req,res) => {
    res.send('index');
});

http.createServer(app).listen(80);
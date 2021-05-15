var MyEmitter = require('events'); 
const MongoClient = require('mongodb').MongoClient;

const uri = process.env.URI;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
let collection = null;

const connectionEmitter = new MyEmitter.EventEmitter();

client.connect()
.then(connection => {
    console.log("MongoDB remote database Connected");
    collection = connection.db().collection('log');
    connectionEmitter.emit('connected');
})
.catch(err => {
    console.log("Error connecting to MongoDB DATABASE");
    client.close();
});


module.exports = function (callback){
    connectionEmitter.on('connected', () => {
        callback(collection);
    })
}
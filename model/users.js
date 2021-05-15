const path = require('path');
let collection = null;
const dbCollection = require('./database');


dbCollection(col => {
    collection = col;
});


function SaveUser(body, callback){
    if(collection == null){
        callback({error:'Cannot connect to database'});
        return;
    }
    const user = body.username;
    const doc = { username:user };
    collection.insertOne(doc)
    .then(result => {
        callback(result.ops[0]);
    })
    .catch(err => {
        console.error(err);
        callback({error:'Cannot complete operation'});
    });
}

function GetUsers(callback){
    if(collection == null){
        callback({error:'Cannot connect to database'});
        return;
    }
    collection
    .find()
    .project({_id:1, username:1})
    .toArray()
    .then(res => {
        if(res != null){
            callback(res);
            return;
        }

        callback({error:'None users found'});
    })
    .catch(err => {
        console.error(err);
        callback({error:'Cannot get users'});
    });
}




module.exports = {
    SaveUser,
    GetUsers
}

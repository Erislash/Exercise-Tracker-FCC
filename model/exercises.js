const path = require('path');
const dbCol = require('./database.js');
let collection = null; 
const ObjectId = require('mongodb').ObjectID;

dbCol(c => {
    collection = c;
});


function GetExercise(id, callback){
    collection.findOne({_id : ObjectId(id)})
    .then(res => {
        if(res){
            callback(res)
            return;
        }

        callback(-1);
    })
    .catch(res => {
        callback(-1)
    });
}


function AddExercise(params, callback){
    GetExercise(params.id, (res) => {
        if(res === -1){
            callback({error: 'Can\'t get id'})
        }

        let log = (res.log) ? res.log : [];
        log.push({
            description: params.description,
            duration: params.duration,
            date: params.date
        });

        collection.updateOne({_id : ObjectId(params.id)}, {$set:{log: log}})
        .then(update => {
            res.log = log;
            callback(res);
        })
        .catch(err => {
            callback({error: 'Can\'t update log'})
        });
    });
}   




function GetExercisesLog(id, callback){
    GetExercise(id, (res) => {
        if(res === -1){
            callback({error: 'Can not get log'});
            return;
        }
        let result = res;
        result.count = res.log.length;

        callback(result);
    })
}



module.exports = {
    AddExercise,
    GetExercisesLog
}
const path = require('path');
const {AddExercise, GetExercisesLog} = require(path.join(__dirname, '..', 'model', 'exercises.js'));

Date.prototype.isValid = function () {
    return this.getTime() === this.getTime();
};



function NewExercise(req, res){
    if(!req.params._id || !req.body.description || !req.body.duration){
        res.json({error:'You have to complete the log'});
        return;
    }

    let date = new Date(req.body.date);

    if(!date || !date.isValid()){
        date = new Date();
    }

    date = date.toDateString();

    const params = {
        id: req.params._id,
        description: req.body.description,
        duration: req.body.duration,
        date: date
    }

    AddExercise(params, (result) => {
        res.json({result});
    });
}

function GetExercises(req, res){
    if(!req.params._id){
        res.json({error:'Invalid ID'})
        return;
    }

    const params = {
        id: req.params._id,
        from: (req.query.from) ? req.query.from : null,
        to: (req.query.to) ? req.query.to : null,
        limit: (req.query.limit) ? req.query.limit : null
    }

    console.log(req.query);
    GetExercisesLog(params, (result) => {
        res.json(result);
    });
}

module.exports = {
    NewExercise,
    GetExercises
}
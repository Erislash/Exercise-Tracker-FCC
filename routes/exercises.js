const path = require('path');
const routes = require('express').Router();
const {NewExercise, GetExercises} = require(path.join(__dirname, '..', 'controller', 'exercises.js'));


routes.post('/api/users/:_id/exercises', NewExercise);
routes.get('/api/users/:_id/logs', GetExercises);


module.exports = routes;
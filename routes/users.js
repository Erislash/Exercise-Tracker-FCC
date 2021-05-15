const path = require('path');
const routes = require('express').Router();
const {SaveUserController, GetUsersController} = require(path.join(__dirname, '..', 'controller', 'users.js'));


routes.post('/api/users', SaveUserController);
routes.get('/api/users', GetUsersController);


module.exports = routes;
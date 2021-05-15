const path = require('path');
const {SaveUser, GetUsers} = require(path.join(__dirname, '..', 'model', 'users.js'));


function SaveUserController(req, res){
    SaveUser(req.body, (result) => {
        res.json(result);
    });
}

function GetUsersController(req, res){
    GetUsers((result) => {
        res.json(result);
    });
}

module.exports = {
    SaveUserController,
    GetUsersController
};

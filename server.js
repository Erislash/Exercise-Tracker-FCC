const express = require('express')
const path = require('path');
const app = express()
const cors = require('cors')
require('dotenv').config()

app.use(cors())
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html')
});


const users = require(path.join(__dirname, 'routes', 'users.js'));
app.use(users);


const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port)
})

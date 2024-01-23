var express = require('express');

var todoController = require('./controllers/todoController');

var app = express();

// set up template engine
app.set('view enginee', 'ejs');

// static files
app.use(express.static('./public'));

// fire controllers 
todoController(app);

// specify port to listen to
app.listen(3000);
console.log('You are listening to port 3000');
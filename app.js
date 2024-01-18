var express = require('express');

var app = express();

// set up template engine
app.set('view enginee', 'ejs');

// static files
app.use(express.static,('./public'));

// specify port to listen to
app.listen(3000);
console.log('You are listening to port 3000');
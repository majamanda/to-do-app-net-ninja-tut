var bodyParser = require('body-parser');
const { Db } = require('mongodb');
var mongoose = require('mongoose');

// conn
mongoose.connect('mongodb://localhost:27017/tododb').then(() => console.log('Connected!'));

// creating schema
var todoSchema = new mongoose.Schema({
    item: String
});

var Todo = mongoose.model('Todo2', todoSchema);

// var data = [{item: 'get buck'}, {item: 'get sleep'}, {item: 'get milk'}];

var urlencodedParser = bodyParser.urlencoded({extended: false});

module.exports = function(app) {
    app.get('/todo', function(req, res) {
        // get data from db
        Todo.find({}, function(err, data) {
            if (err) throw err;
            res.render('todo', {todos: data});
        });
    });
    
    app.post('/todo', urlencodedParser, function(req, res) {
        // get data from the view and add it to mongo Db
        var itemOne = Todo(req.body).save().then(() => console.log('item saved!'));

        Todo.find({}, function(err, data) {
            if (err) throw err;
            res.render('todo', {todos: data});
        });
    });

    app.delete('/todo/:item', function(req, res) {
        // delete the requested item from mongodb 
        Todo.find({item: req.params.item.replace(/\-/g, " ")}).remove(function(err, data) {
            if (err) throw err;
            res.render('todo', {todos: data});
        });

        // data = data.filter(function(todo){
        //     return todo.item.replace(/ /g, "-") !== req.params.item;
        // });
        // res.json(data)
    });

};
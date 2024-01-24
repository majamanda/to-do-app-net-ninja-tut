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

    app.get('/todo', async function(req, res) {
        // get data from db
        var data = await Todo.find({}).exec();
        // console.log(data);
        res.render('todo', {todos: data});
    });
    
    app.post('/todo', urlencodedParser, async function(req, res) {
        // get data from the view and add it to mongo Db
        await Todo(req.body).save();

        var data = await Todo.find({}).exec();
        res.render('todo', {todos: data});
    });

    app.delete('/todo/:item', async function(req, res) {
        // delete the requested item from mongodb 
        var data = await Todo.findOne({item: req.params.item.replace(/\-/g, " ")}).exec();
        console.log(data);
        await Todo.deleteOne(data);
        res.render('todo', {todos: data});

        // data = data.filter(function(todo){
        //     return todo.item.replace(/ /g, "-") !== req.params.item;
        // });
        // res.json(data)
    });

};
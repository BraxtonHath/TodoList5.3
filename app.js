const express = require('express');
const mustacheExpress = require('mustache-express');
const bodyParser = require('body-parser');

const app = express();


app.engine('mustache', mustacheExpress());
app.set('view engine', 'mustache');
app.set('views', './views');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

var todoIndex = 0;
var completedIndex = 0;

var context = {
  todoList: [
  'make todoList'
  ]
  , todoId: function(){
    return todoIndex++;
  }
  , completed: []
  , completedId: function(){
    return completedIndex++;
  }
};

app.get('/', function(req, res) {
  todoIndex = 0;
  res.render('index', context);
});

app.post('/', function(req, res) {
  var todo = context.todoList;
  todo.push(req.body.todoInput);
  res.redirect('/');
});

app.post('/todo/:id', function(req, res) {
  var id = req.params.id;
  var todoRemove = context.todoList.splice(id, 1);
  context.completed.push(todoRemove);
  res.redirect('/');
});

app.listen(3000, function() {
  console.log('Successfully started express application!');
});

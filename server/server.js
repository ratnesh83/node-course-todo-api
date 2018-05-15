const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');

var {mongoose} = require('./db/mongoose.js');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');
var {authenticate} = require('./middleware/authenticate');
//mongoose takes care to timing of connection. it does not take callback.

var app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.post('/todos',(req,res)=>{
    console.log(req.body.text);
    var todo = new Todo({
        text:req.body.text
    });

    todo.save().then((doc)=>{
        res.send(doc);
    },err=>{
        res.status(400).send(err);
        console.log(err)
    });
});

app.get('/todos',(req,res)=>{
   Todo.find().then((todos)=>{
       res.send({
           todos
        //   code:45 - you can send some more data
        });},err=>{
            res.status(400).send(e);
        }); 
});

app.get('/todos/:id',(req,res)=>{
    var id = req.params.id;
    //valid id using isValid
    //404 - send back empty send
    if(!ObjectID.isValid(id)){
        return res.status(404).send();
    }
    Todo.findById(id).then((todo)=>{
        if(!todo){
            return res.status(404).send();
        }
        res.send({todo});
    }).catch(error=>{
        res.status(400).send();
    });
});

app.delete('/todos/:id',(req,res)=>{
    //get the id
    //validate the id->not valid? return 404
    //remove todo by id
         //success
            //if no doc, send 404
            //if doc send doc back with 404 
         //error
            //400 with empty body   
    var id = req.params.id;
    if(!ObjectID.isValid(id)){
        return res.status(404).send();
    }
    
    Todo.findByIdAndRemove(id).then((todo)=>{
        if(!todo){
            return res.status(404).send();
        }
        res.send(todo);
    }).catch((e)=>{
        res.status(400).send();
    })
});

app.patch('/todos/:id',(req,res)=>{
    var id = req.params.id;
    var body = _.pick(req.body,['text','completed']);

    if(!ObjectID.isValid(id)){
        return res.status(404).send();
    }

    if(_.isBoolean(body.completed) && body.completed) {
        body.completedAt = new Date().getTime();
    }else{
        body.completed = false;
        body.completedAt = null;
    }

    Todo.findByIdAndUpdate(id,{$set:body},{new:true}).then((todo)=>{
        if(!todo){
            return res.status(404).send();
        }

        res.send({todo});
    }).catch((e)=>{
        res.status(400).send();
    })
});

app.post('/users',(req,res)=>{
    console.log('u');
    var body = _.pick(req.body,['email','password']);
    var user = new User(body);

    user.save().then(()=>{
        return user.generateAuthToken();
        //res.send(user);
    }).then((token)=>{
        res.header('x-auth',token).send(user);
    }).catch((e)=>{
        res.status(400).send(e);
    })
});

app.get('/users/me',authenticate,(req,res)=>{
   res.send(req.user);
});

app.listen(port,()=>{
    console.log(`started on ${port}`);
});



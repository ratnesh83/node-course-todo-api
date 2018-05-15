const {ObjectId} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');

var id = '6ae84bcbf20249194877ebbd';

if(!ObjectId.isValid(id)){
    console.log('id not valid');
}

//returns array of objects
Todo.find({
    _id: id
}).then((todos)=>{
    console.log('Todos',todos);
});


//returns single object
Todo.findOne({
    _id: id
}).then((todo)=>{
    console.log('Todos',todo);
});


//returns single object
Todo.findById(id).then((todo)=>{
    if(!todo){
        return console.log('Id not found');
    }
    console.log('Todos',todo);
}).catch(err=>{
    console.log(err)
});
const MongoClient = require('mongodb').MongoClient;

MongoClient.connect('mongodb://localhost:27017/TodoApp',(err,db)=>{
    if(err){
        return console.log("unable to connect");
    }
    console.log('connected');

    db.collection('Todos').find({completed:true}).toArray().then((docs)=>{
        console.log(docs);
    },err =>{
        console.log(err);
    })
    //db.close();
});
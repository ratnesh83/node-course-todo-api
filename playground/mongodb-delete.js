const MongoClient = require('mongodb').MongoClient;

MongoClient.connect('mongodb://localhost:27017/TodoApp',(err,db)=>{
    if(err){
        return console.log("unable to connect");
    }
    console.log('connected');

    db.collection('Todos').deleteMany({completed:true}).then((result)=>{
        console.log(result);
    },err =>{
        console.log(err);
    });

    //deletes only one that is the first one
    db.collection('Todos').deleteOne({completed:false}).then((result)=>{
        console.log(result);
    },err =>{
        console.log(err);
    });

    //find one and delete
    // returns the document that is deleted
    db.collection('Todos').findOneAndDelete({completed:false}).then((result)=>{
        console.log(result);
    },err =>{
        console.log(err);
    });

    //db.close();
});


const {MongoClient,ObjectId} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp',(err,db)=>{
    if(err){
        return console.log("unable to connect");
    }
    console.log('connected');

    db.collection('Todos').findOneAndUpdate({_id:new ObjectId("5ae82be2f35fb22c18c482c0")},{$set:{completed:true}},
{returnOriginal:false}).then((docs)=>{
        console.log(docs);
    },err =>{
        console.log(err);
    });

    //db.close();
});
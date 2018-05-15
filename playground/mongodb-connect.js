const MongoClient = require('mongodb').MongoClient;

MongoClient.connect('mongodb://ratnesh:lomesh12504@ds013222.mlab.com:13222/todoapp',(err,db)=>{
    if(err){
        return console.log("unable to connect");
    }
    console.log('connected');

    db.collection('Todos').insertOne({
        text:'Something',
        completed:false
    },(err,result)=>{
        if(err){
            return console.log('unable to insert',err);
        }
        console.log(JSON.stringify(result.ops,undefined,2));
        console.log(JSON.stringify(result.ops[0]._id.getTimestamp()));
    });
    db.close();
});
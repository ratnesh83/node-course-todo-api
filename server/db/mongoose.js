var mongoose = require('mongoose');
mongoose.Promise = global.Promise;

//mongoose.connect('mongodb://localhost:27017/TodoApp');
mongoose.connect(process.env.MONGODB_URI || 'mongodb://ratnesh:lomesh12504@ds013222.mlab.com:13222/todoapp');

module.exports = {mongoose};
const mongoose = require("mongoose");

const { DATABASE_HOST, DATABASE, USER_DATABASE, PASSWORD_DATABASE} = process.env;

// const mongodb_URI = `mongodb+srv://${USER_DATABASE}:${PASSWORD_DATABASE}@${DATABASE_HOST}/${DATABASE}?retryWrites=true&w=majority`;

const mongodb_URI = `mongodb://${DATABASE_HOST}/${DATABASE}`;

mongoose.connect(mongodb_URI, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useFindAndModify: false,
  useCreateIndex: true,
}).
then(db => {console.log(DATABASE, 'is conected')}).
catch(err => {console.error(err)});



module.exports = mongoose;

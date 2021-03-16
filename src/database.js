const mongoose = require("mongoose");

const { DATABASE_HOST, DATABASE, DATABASE_USER, DATABASE_PASSWORD} = process.env;

const mongodb_URI = `mongodb+srv://${DATABASE_USER}:${DATABASE_PASSWORD}@${DATABASE_HOST}/${DATABASE}?retryWrites=true&w=majority`;

// const mongodb_URI = `mongodb://localhost:27017/${DATABASE}`;

mongoose.connect(mongodb_URI, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useFindAndModify: false,
  useCreateIndex: true,
}).
then(db => {console.log(DATABASE, 'is conected.')}).
catch(err => {console.log(err)});



module.exports = mongoose;

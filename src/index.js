const express = require('express');
const app = express(); //Essa função devolve um objeto que serve como servidor
const path = require('path');
  
// Settings
app.set('port', 3000);
app.set('view engine','ejs'); //EJS já vem com o express
app.engine('html', require('ejs').renderFile);
app.set('views',path.join(__dirname,'views'))

// Middlewares

// Routes
app.use(require('./routes/index'));

//Static Files
app.use(express.static(path.join(__dirname,'public')));

//Listening the server
app.listen(app.get('port'), ()=>{
    console.log('Server on Port',app.get('port'));
});
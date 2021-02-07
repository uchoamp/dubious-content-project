require('dotenv').config()

const app = require('./server')
require('./database')

app.listen(app.get("PORT"), ()=>{
    console.log('Server in PORT',app.get("PORT"));
})
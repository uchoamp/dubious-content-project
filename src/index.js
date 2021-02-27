if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
  }

const app = require('./app')
require('./database')

app.listen(app.get("PORT"), ()=>{
    console.log('Server in PORT',app.get("PORT"));
})
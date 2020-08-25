const express = require('express');
const routes = require('./routes');
const sequelize = require('./config/connection.js');

const app = express();
const PORT = process.env.PORT || 3001;

//middleware data interception and parsing
app.use(
  express.json()
);
app.use(
  express.urlencoded(
    { 
      extended: true 
    }
  )
);

//turn on routes
app.use(routes);

//turn on connection to db and server
sequelize.sync(
  {//if this was true, it would drop and recreate databases on startup
    // great for maching changes to the Sequelize models, as the database
    // would need a way to understand that something has changed.
    // might need to do a few times but set to false for now.
    //** we set this true now because if its false the we will get
    // a foreign key constraint error 
    force: true  
  }
)
.then(() => {
  app.listen(PORT, () => {
    console.log('\x1b[33m', `Now Listening on port ${PORT}!`, '\x1b[00m');
  })
});